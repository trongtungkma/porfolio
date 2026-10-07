import { careerOverridesSchema, careerSchema } from './career-schema';

function assertUniqueIds(label: string, items: Array<{ id: string }>) {
  const ids = items.map((item) => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    throw new Error(`${label} contains duplicate IDs: ${[...new Set(duplicates)].join(', ')}`);
  }
}

export function validateCareerConfig(careerInput: unknown, overridesInput: unknown) {
  const career = careerSchema.parse(careerInput);
  const overrides = careerOverridesSchema.parse(overridesInput);

  assertUniqueIds('Employment', career.employment);
  assertUniqueIds('Projects', career.projects);
  assertUniqueIds('Skill groups', career.skillGroups);
  assertUniqueIds('Education', career.education);
  assertUniqueIds('Certifications', career.certifications);
  assertUniqueIds('Languages', career.languages);

  const projectIds = new Set(career.projects.map((project) => project.id));
  const missingFeatured = overrides.featuredProjectIds.filter((id) => !projectIds.has(id));
  if (missingFeatured.length) {
    throw new Error(`Featured project IDs are missing from career.json: ${missingFeatured.join(', ')}`);
  }

  if (!career.meta.sourceCv.startsWith('/')) {
    throw new Error('meta.sourceCv must be a root-relative public URL.');
  }

  return { career, overrides };
}
