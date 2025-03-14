/**
 * Default markdown template for resumes
 */
module.exports = `# {{name}}

{{contactInfo.email}} | {{contactInfo.phone}} | {{contactInfo.location}}{{#contactInfo.linkedin}} | [LinkedIn]({{contactInfo.linkedin}}){{/contactInfo.linkedin}}{{#contactInfo.website}} | [Website]({{contactInfo.website}}){{/contactInfo.website}}

## Summary
{{summary}}

## Experience
{{#experience}}
### {{position}} | {{company}} | {{startDate}} - {{endDate}}
{{#bulletPoints}}
- {{.}}
{{/bulletPoints}}

{{/experience}}

## Education
{{#education}}
### {{degree}} in {{field}} | {{institution}} | {{graduationYear}}
{{#details}}
- {{.}}
{{/details}}

{{/education}}

## Skills
{{#skillCategories}}
### {{category}}
{{skills}}

{{/skillCategories}}

{{#certifications.length}}
## Certifications
{{#certifications}}
- {{.}}
{{/certifications}}
{{/certifications.length}}
`;