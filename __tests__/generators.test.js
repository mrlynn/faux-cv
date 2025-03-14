// __tests__/generators.test.js

const basicInfo = require('../lib/generators/basicInfo');
const summary = require('../lib/generators/summary');
const experience = require('../lib/generators/experience');
const education = require('../lib/generators/education');
const skills = require('../lib/generators/skills');
const certifications = require('../lib/generators/certifications');
const industries = require('../lib/data/industries');

jest.mock('@faker-js/faker', () => {
  return {
    faker: {
      person: {
        firstName: jest.fn().mockReturnValue('John'),
        lastName: jest.fn().mockReturnValue('Doe')
      },
      internet: {
        email: jest.fn().mockReturnValue('john.doe@example.com')
      },
      helpers: {
        fromRegExp: jest.fn().mockReturnValue('555-123-4567'),
        arrayElement: jest.fn(arr => arr[0]),
        maybe: jest.fn((callback, options) => options.probability > 0.5 ? callback() : '')
      },
      location: {
        city: jest.fn().mockReturnValue('New York'),
        state: jest.fn().mockReturnValue('NY')
      },
      string: {
        numeric: jest.fn().mockReturnValue('123456')
      },
      word: {
        adjective: jest.fn().mockReturnValue('innovative'),
        noun: jest.fn().mockReturnValue('paradigm')
      }
    }
  };
});

// Mock utils functions
jest.mock('../lib/utils', () => {
  return {
    randomInt: jest.fn().mockImplementation((min, max) => min),
    pickRandom: jest.fn().mockImplementation(array => array[0]),
    pickMultiple: jest.fn().mockImplementation((array, min, max) => array.slice(0, min)),
    generateDateRange: jest.fn().mockImplementation((years, months, isCurrent) => ({
      startDate: 'January 2020',
      endDate: isCurrent ? 'Present' : 'January 2021'
    }))
  };
});

describe('Resume Generators', () => {
  describe('Basic Info Generator', () => {
    test('should generate basic info with default options', () => {
      const info = basicInfo.generateBasicInfo({});
      expect(info).toHaveProperty('name', 'John Doe');
      expect(info).toHaveProperty('contactInfo');
      expect(info.contactInfo).toHaveProperty('email', 'john.doe@example.com');
      expect(info.contactInfo).toHaveProperty('phone', '555-123-4567');
      expect(info.contactInfo).toHaveProperty('location', 'New York, NY');
      expect(info.contactInfo.linkedin).toBeNull();
      expect(info.contactInfo.website).toBeNull();
    });

    test('should include LinkedIn and website when specified', () => {
      const info = basicInfo.generateBasicInfo({
        includeLinkedin: true,
        includeWebsite: true
      });
      expect(info.contactInfo.linkedin).toContain('linkedin.com/in/john-doe');
      expect(info.contactInfo.website).toBe('johndoe.com');
    });

    test('should use the specified gender', () => {
      basicInfo.generateBasicInfo({ gender: 'female' });
      const { faker } = require('@faker-js/faker');
      expect(faker.person.firstName).toHaveBeenCalledWith('female');
    });
  });

  describe('Summary Generator', () => {
    const techIndustryData = industries.tech;

    test('should generate entry-level summary', () => {
      const result = summary.generateSummary(techIndustryData, 2, {});
      expect(result).toContain('Enthusiastic');
      expect(result).toContain('2 years');
    });

    test('should generate mid-level summary', () => {
      const result = summary.generateSummary(techIndustryData, 5, {});
      expect(result).toContain('Experienced');
      expect(result).toContain('5 years');
    });

    test('should generate senior-level summary', () => {
      const result = summary.generateSummary(techIndustryData, 10, {});
      expect(result).toContain('Seasoned');
      expect(result).toContain('10 years');
    });
  });

  describe('Experience Generator', () => {
    const techIndustryData = industries.tech;

    test('should generate appropriate number of experiences based on years', () => {
      const juniorExp = experience.generateExperience(techIndustryData, 2, {});
      expect(juniorExp.length).toBe(1);
      
      const midExp = experience.generateExperience(techIndustryData, 5, {});
      expect(midExp.length).toBe(2);
      
      const seniorExp = experience.generateExperience(techIndustryData, 10, {});
      expect(seniorExp.length).toBe(3);
    });

    test('should create proper job structure with bullet points', () => {
      const result = experience.generateExperience(techIndustryData, 5, {})[0];
      expect(result).toHaveProperty('position');
      expect(result).toHaveProperty('company');
      expect(result).toHaveProperty('startDate');
      expect(result).toHaveProperty('endDate');
      expect(result).toHaveProperty('bulletPoints');
      expect(Array.isArray(result.bulletPoints)).toBe(true);
      expect(result.bulletPoints.length).toBeGreaterThan(0);
    });
  });

  describe('Education Generator', () => {
    const techIndustryData = industries.tech;

    test('should generate bachelor degree for junior profiles', () => {
      const result = education.generateEducation(techIndustryData, 3, {});
      expect(result[0].degree).toBe('Bachelor\'s');
      expect(result[0].field).toBeDefined();
      expect(result[0].institution).toBeDefined();
      expect(result[0].graduationYear).toBeDefined();
    });

    test('should sometimes include GPA and relevant coursework', () => {
      const utils = require('../lib/utils');
      utils.randomInt.mockReturnValueOnce(38); // GPA value
      utils.randomInt.mockReturnValueOnce(1); // For other random values
      
      const result = education.generateEducation(techIndustryData, 3, {});
      expect(result[0].details.some(detail => detail.includes('GPA'))).toBe(true);
    });
  });

  describe('Skills Generator', () => {
    const techIndustryData = industries.tech;

    test('should generate technical and soft skills', () => {
      const result = skills.generateSkills(techIndustryData);
      expect(result.length).toBe(2);
      expect(result[0].category).toBe('Technical Skills');
      expect(result[1].category).toBe('Soft Skills');
      
      expect(typeof result[0].skills).toBe('string');
      expect(typeof result[1].skills).toBe('string');
    });
  });

  describe('Certifications Generator', () => {
    const techIndustryData = industries.tech;

    test('should return empty array for very junior profiles', () => {
      const utils = require('../lib/utils');
      utils.randomInt.mockReturnValueOnce(0); // For random determination
      
      const result = certifications.generateCertifications(techIndustryData, 1);
      expect(result).toEqual([]);
    });

    test('should generate certifications for experienced profiles', () => {
      // Setup deterministic behavior:
      // 1. First randomInt call should return 2 (number of certs)
      // 2. Set pickMultiple to return some certs
      const utils = require('../lib/utils');
      utils.randomInt.mockReturnValueOnce(2);
      utils.pickMultiple.mockReturnValueOnce(['Cert1', 'Cert2']);
      
      const result = certifications.generateCertifications(techIndustryData, 8);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});