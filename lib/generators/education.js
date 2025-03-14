const { faker } = require('@faker-js/faker');
const { randomInt, pickRandom, pickMultiple } = require('../utils');

/**
 * Generate education history
 * @param {Object} industryData Industry-specific data
 * @param {number} experienceYears Years of experience
 * @param {Object} options Options for generation
 * @returns {Array} Array of education entries
 */
function generateEducation(industryData, experienceYears, options) {
  const degree = experienceYears >= 7 && Math.random() > 0.7
    ? faker.helpers.arrayElement(['Master\'s', 'MBA', 'Ph.D.'])
    : faker.helpers.arrayElement(['Bachelor\'s', 'Associate\'s']);
  
  const field = pickRandom(industryData.degrees);
  const institution = faker.helpers.arrayElement([
    `${faker.location.state()} University`,
    `University of ${faker.location.state()}`,
    `${faker.word.adjective({ capitalize: true })} ${faker.helpers.arrayElement(['College', 'University', 'Institute'])}`,
    `${faker.location.city()} College`
  ]);
  
  const currentYear = new Date().getFullYear();
  const graduationYear = currentYear - (experienceYears + randomInt(0, 2));
  
  const details = [];
  if (Math.random() > 0.5) {
    details.push(`GPA: ${(randomInt(30, 40) / 10).toFixed(1)}`);
  }
  
  if (Math.random() > 0.6) {
    details.push(`${faker.helpers.arrayElement(['Relevant coursework', 'Specialized in', 'Focus area'])}: ${pickMultiple(industryData.skills, 2, 3).join(', ')}`);
  }
  
  if (Math.random() > 0.7) {
    details.push(`${faker.helpers.arrayElement(['Member of', 'Participated in', 'Active in'])} ${faker.helpers.arrayElement(['Student Association', 'Honor Society', 'Research Group', 'Campus Organization'])}`);
  }
  
  const education = [{
    degree,
    field,
    institution,
    graduationYear,
    details
  }];
  
  // Add a second degree sometimes
  if (experienceYears > 5 && Math.random() > 0.7) {
    const secondDegree = {
      degree: degree === 'Bachelor\'s' ? faker.helpers.arrayElement(['Master\'s', 'MBA', 'Ph.D.']) : 'Bachelor\'s',
      field: pickRandom(industryData.degrees),
      institution: faker.helpers.arrayElement([
        `${faker.location.state()} University`,
        `University of ${faker.location.state()}`,
        `${faker.word.adjective({ capitalize: true })} ${faker.helpers.arrayElement(['College', 'University', 'Institute'])}`,
        `${faker.location.city()} College`
      ]),
      graduationYear: degree === 'Bachelor\'s' ? graduationYear - randomInt(2, 5) : graduationYear + randomInt(2, 4),
      details: []
    };
    
    education.push(secondDegree);
  }
  
  return education;
}

module.exports = {
  generateEducation
};