import careerJson from '../content/career.json';
import overridesJson from '../content/career-overrides.json';
import { validateCareerConfig } from '../content/career-validation';

const { career } = validateCareerConfig(careerJson, overridesJson);

console.log(`Career data is valid: ${career.employment.length} jobs, ${career.projects.length} projects, ${career.skillGroups.length} skill groups.`);
