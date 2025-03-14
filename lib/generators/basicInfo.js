const { faker } = require('@faker-js/faker');

/**
 * Generate basic personal information
 * @param {Object} options Options for generation
 * @param {string} options.gender Gender (male, female)
 * @param {string} options.phoneFormat Format for phone generation
 * @param {boolean} options.includeLinkedin Include LinkedIn profile
 * @param {boolean} options.includeWebsite Include personal website
 * @returns {Object} Basic information object
 */
function generateBasicInfo(options) {
  const gender = options.gender || (Math.random() > 0.5 ? 'male' : 'female');
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName();
  
  return {
    name: `${firstName} ${lastName}`,
    contactInfo: {
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: faker.helpers.fromRegExp(options.phoneFormat || '[0-9]{3}-[0-9]{3}-[0-9]{4}'),
      location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
      linkedin: options.includeLinkedin ? `linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${faker.string.numeric(6)}` : null,
      website: options.includeWebsite ? `${firstName.toLowerCase()}${lastName.toLowerCase()}.com` : null
    }
  };
}

module.exports = {
  generateBasicInfo
};