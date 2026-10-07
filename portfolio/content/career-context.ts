import type { Career } from './career-schema';

function list(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

export function buildCareerContext(career: Career) {
  const employment = career.employment.map((job, index) => {
    const client = job.client ? `, on ${job.client}` : '';
    const currentNote = job.currentAsRecorded ? ' as recorded in the supplied CV; current status is unconfirmed' : '';
    return `${index + 1}. ${job.company}${client} — ${job.role}, ${job.period}${currentNote}.\n${job.highlights.map((item) => `   - ${item}`).join('\n')}`;
  }).join('\n');

  const projects = career.projects.map((project, index) => {
    const team = project.teamSize ? `, ${project.teamSize}-person team` : '';
    const currentNote = project.currentAsRecorded ? '; current status is unconfirmed' : '';
    return `${index + 1}. ${project.name} — ${project.role}${team}, ${project.period}${currentNote}.\n   - ${project.description}\n${project.highlights.map((item) => `   - ${item}`).join('\n')}\n   - Technologies recorded: ${project.technologies.join(', ') || 'None listed'}.`;
  }).join('\n');

  const skills = career.skillGroups
    .map((group) => `- ${group.title}: ${group.skills.join(', ')}.`)
    .join('\n');

  const education = career.education
    .map((item) => `- ${item.institution}, ${item.program}, ${item.period}.`)
    .join('\n');
  const certifications = career.certifications
    .map((item) => `- ${item.name} — ${item.detail}, earned ${item.year}.${item.statusNote ? ` ${item.statusNote}` : ''}`)
    .join('\n');
  const languages = career.languages
    .map((item) => `- ${item.name}: ${item.level}${item.year ? `, recorded in ${item.year}` : ''}.${item.note ? ` ${item.note}` : ''}`)
    .join('\n');

  return `
IDENTITY
- Name: ${career.person.name}${career.person.aliases.length ? ` (also written ${career.person.aliases.join(', ')})` : ''}.
- Role: ${career.person.title}, based in ${career.person.location}.
- Career began in ${career.person.careerStarted}. Do not assume uninterrupted employment or an updated year count.
- Professional email: ${career.person.email}.
- Phone: ${career.person.phone}.
- ${career.person.availability}

PROFESSIONAL SUMMARY
${list(career.summary)}

EMPLOYMENT
${employment}

PROJECTS
${projects}

TECHNICAL SKILLS
${skills}

EDUCATION AND CREDENTIALS
${education}
${certifications}
${languages}

INTERESTS AND WORKING STYLE
- ${career.interests.join(', ')}.
- Personal principle: "${career.principle}"
`.trim();
}
