const { faker } = require('@faker-js/faker');
const { randomInt, pickRandom, pickMultiple, generateDateRange } = require('../utils');

/**
 * Generate work experience
 * @param {Object} industryData Industry-specific data
 * @param {number} experienceYears Years of experience
 * @param {Object} options Options for generation
 * @returns {Array} Array of work experiences
 */
function generateExperience(industryData, experienceYears, options) {
  const jobCount = Math.min(
    experienceYears <= 3 ? randomInt(1, 2) :
    experienceYears <= 7 ? randomInt(2, 3) :
    randomInt(3, 5),
    5
  );
  
  const experience = [];
  let remainingYears = experienceYears;
  let monthsAgo = 0;
  
  for (let i = 0; i < jobCount; i++) {
    const isCurrent = i === 0;
    const jobYears = i === jobCount - 1 
      ? remainingYears 
      : Math.min(randomInt(1, 3), remainingYears);
    
    remainingYears -= jobYears;
    
    const dateRange = generateDateRange(jobYears, monthsAgo, isCurrent);
    monthsAgo += jobYears * 12 + randomInt(0, 3);
    
    const jobTitle = pickRandom(industryData.jobTitles);
    const company = pickRandom(industryData.companies);
    const jobSkills = pickMultiple(industryData.skills, 3, 6);
    
    // Generate bullet points based on job level and industry
    const bulletPointCount = randomInt(3, 5);
    const bulletPoints = [];
    
    const actionVerbs = [
      'Developed', 'Implemented', 'Designed', 'Led', 'Managed', 'Created',
      'Built', 'Established', 'Improved', 'Optimized', 'Launched', 'Spearheaded'
    ];
    
    for (let j = 0; j < bulletPointCount; j++) {
      const verb = pickRandom(actionVerbs);
      const skill = pickRandom(jobSkills);
      
      let result;
      switch (j % 3) {
        case 0:
          result = `${verb} ${faker.word.adjective()} ${skill} solution${faker.helpers.maybe(() => 's', { probability: 0.5 })}, resulting in ${randomInt(10, 40)}% improvement in ${faker.helpers.arrayElement(['efficiency', 'performance', 'productivity', 'user satisfaction'])}`;
          break;
        case 1:
          result = `${verb} cross-functional team${faker.helpers.maybe(() => 's', { probability: 0.5 })} to ${faker.helpers.arrayElement(['implement', 'design', 'develop', 'deploy'])} ${skill} ${faker.helpers.arrayElement(['systems', 'solutions', 'frameworks', 'approaches'])}`;
          break;
        case 2:
          result = `${faker.helpers.arrayElement(['Collaborated with', 'Partnered with', 'Worked closely with'])} ${faker.helpers.arrayElement(['stakeholders', 'clients', 'team members', 'executives'])} to ${faker.helpers.arrayElement(['deliver', 'enhance', 'optimize', 'transform'])} ${skill} capabilities`;
          break;
      }
      
      bulletPoints.push(result);
    }
    
    experience.push({
      position: jobTitle,
      company,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      bulletPoints
    });
  }
  
  return experience;
}

module.exports = {
  generateExperience
};