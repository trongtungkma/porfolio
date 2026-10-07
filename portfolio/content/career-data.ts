import careerJson from './career.json';
import overridesJson from './career-overrides.json';
import { careerOverridesSchema, careerSchema } from './career-schema';

export const career = careerSchema.parse(careerJson);
export const careerOverrides = careerOverridesSchema.parse(overridesJson);

const projectsById = new Map(career.projects.map((project) => [project.id, project]));

export const featuredProjects = careerOverrides.featuredProjectIds
  .map((projectId) => projectsById.get(projectId))
  .filter((project): project is NonNullable<typeof project> => Boolean(project))
  .map((project) => ({
    ...project,
    category: careerOverrides.projectCategories[project.id] ?? 'Project',
    url: careerOverrides.projectUrls[project.id] ?? null,
  }));

export const cvUrl = career.meta.sourceCv;
