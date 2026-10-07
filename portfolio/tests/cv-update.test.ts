import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import careerJson from '../content/career.json';
import overridesJson from '../content/career-overrides.json';
import { buildCareerContext } from '../content/career-context';
import { careerSchema, type Career } from '../content/career-schema';
import { validateCareerConfig } from '../content/career-validation';
import { guardChanges, slugify, stabilizeIds } from '../scripts/import-cv';

function cloneCareer(): Career {
  return careerSchema.parse(structuredClone(careerJson));
}

describe('career configuration', () => {
  it('accepts the checked-in career data and protected overrides', () => {
    const result = validateCareerConfig(careerJson, overridesJson);

    assert.equal(result.career.person.name, 'Lê Trọng Tùng');
    assert.equal(result.overrides.featuredProjectIds.length, 4);
  });

  it('rejects malformed CV-derived fields', () => {
    const invalid = structuredClone(careerJson);
    invalid.person.email = 'not-an-email';

    assert.throws(() => validateCareerConfig(invalid, overridesJson));
  });

  it('rejects duplicate stable IDs', () => {
    const invalid = structuredClone(careerJson);
    invalid.projects[1].id = invalid.projects[0].id;

    assert.throws(
      () => validateCareerConfig(invalid, overridesJson),
      /Projects contains duplicate IDs/,
    );
  });

  it('rejects featured projects that disappeared from imported data', () => {
    const invalid = structuredClone(careerJson);
    invalid.projects = invalid.projects.filter((project) => project.id !== 'zabbix-management');

    assert.throws(
      () => validateCareerConfig(invalid, overridesJson),
      /Featured project IDs are missing.*zabbix-management/,
    );
  });
});

describe('Digital Twin context', () => {
  it('is generated from the same career data used by the page', () => {
    const career = cloneCareer();
    career.person.title = 'Senior Frontend Developer';
    career.projects[0].name = 'New CV Project';

    const context = buildCareerContext(career);

    assert.match(context, /Senior Frontend Developer/);
    assert.match(context, /New CV Project/);
    assert.match(context, new RegExp(career.person.email));
  });
});

describe('CV importer safety', () => {
  it('creates predictable kebab-case IDs', () => {
    assert.equal(slugify('Lê Trọng Tùng / Frontend'), 'le-trong-tung-frontend');
    assert.equal(slugify('***'), 'item');
  });

  it('preserves existing IDs for matching jobs and projects', () => {
    const current = cloneCareer();
    const candidate: Omit<Career, 'meta'> = structuredClone(current);
    candidate.employment[0].id = 'changed-by-model';
    candidate.projects[0].id = 'another-generated-id';

    const stabilized = stabilizeIds(candidate, current);

    assert.equal(stabilized.employment[0].id, current.employment[0].id);
    assert.equal(stabilized.projects[0].id, current.projects[0].id);
  });

  it('rejects a CV for a different person', () => {
    const current = cloneCareer();
    const candidate = structuredClone(current);
    candidate.person.name = 'Different Person';

    assert.throws(() => guardChanges(candidate, current), /CV identity changed/);
  });

  it('blocks unexpectedly large removals unless explicitly reviewed', () => {
    const current = cloneCareer();
    const candidate = structuredClone(current);
    candidate.projects = candidate.projects.slice(0, 3);

    assert.throws(() => guardChanges(candidate, current), /More than half of the projects disappeared/);
    assert.doesNotThrow(() => guardChanges(candidate, current, true));
  });
});
