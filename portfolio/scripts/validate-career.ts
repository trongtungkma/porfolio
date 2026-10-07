import careerJson from '../content/career.json';
import overridesJson from '../content/career-overrides.json';
import { careerOverridesSchema, careerSchema } from '../content/career-schema';

const career = careerSchema.parse(careerJson);
const overrides = careerOverridesSchema.parse(overridesJson);

function assertUniqueIds(label: string, items: Array<{ id: string }>) {
  const ids = items.map((item) => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    throw new Error(`${label} contains duplicate IDs: ${[...new Set(duplicates)].join(', ')}`);
  }
}

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

console.log(`Career data is valid: ${career.employment.length} jobs, ${career.projects.length} projects, ${career.skillGroups.length} skill groups.`);
