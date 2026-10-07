import { z } from 'zod';

const nonEmpty = z.string().trim().min(1);
const id = nonEmpty.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const careerSchema = z.object({
  meta: z.object({
    sourceCv: nonEmpty,
    updatedAt: nonEmpty,
    importedAt: z.string().datetime().nullable(),
  }),
  person: z.object({
    name: nonEmpty,
    aliases: z.array(nonEmpty),
    title: nonEmpty,
    location: nonEmpty,
    email: z.string().email(),
    phone: nonEmpty,
    careerStarted: nonEmpty,
    availability: nonEmpty,
  }),
  summary: z.array(nonEmpty).min(1),
  employment: z.array(z.object({
    id,
    company: nonEmpty,
    client: nonEmpty.nullable(),
    role: nonEmpty,
    period: nonEmpty,
    currentAsRecorded: z.boolean(),
    description: nonEmpty,
    highlights: z.array(nonEmpty).min(1),
    technologies: z.array(nonEmpty),
  })).min(1),
  projects: z.array(z.object({
    id,
    name: nonEmpty,
    role: nonEmpty,
    period: nonEmpty,
    currentAsRecorded: z.boolean(),
    description: nonEmpty,
    highlights: z.array(nonEmpty).min(1),
    technologies: z.array(nonEmpty),
    teamSize: z.number().int().positive().nullable(),
  })).min(1),
  skillGroups: z.array(z.object({
    id,
    title: nonEmpty,
    description: nonEmpty,
    skills: z.array(nonEmpty).min(1),
  })).min(1),
  education: z.array(z.object({
    id,
    institution: nonEmpty,
    program: nonEmpty,
    period: nonEmpty,
  })),
  certifications: z.array(z.object({
    id,
    name: nonEmpty,
    detail: nonEmpty,
    year: nonEmpty,
    statusNote: nonEmpty.nullable(),
  })),
  languages: z.array(z.object({
    id,
    name: nonEmpty,
    level: nonEmpty,
    year: nonEmpty.nullable(),
    note: nonEmpty.nullable(),
  })),
  interests: z.array(nonEmpty),
  principle: nonEmpty,
});

export const careerOverridesSchema = z.object({
  featuredProjectIds: z.array(id),
  projectCategories: z.record(id, nonEmpty),
  projectUrls: z.record(id, z.string().url()),
  heroTechnologies: z.array(nonEmpty).min(1),
});

export type Career = z.infer<typeof careerSchema>;
export type CareerOverrides = z.infer<typeof careerOverridesSchema>;
