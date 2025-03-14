// __tests__/integration.test.js

const { generateResume } = require('../lib/index');
const fs = require('fs');
const mockFs = require('mock-fs');
const path = require('path');

// To ensure consistent results during tests
const { faker } = require('@faker-js/faker');

describe('Resume Generation Integration Tests', () => {
  beforeAll(() => {
    // Set the seed for consistent random results
    faker.seed(12345);
  });

  afterAll(() => {
    // Reset faker configuration
    faker.seed();
  });

  beforeEach(() => {
    // Set up a mock file system
    mockFs({
      'output': {},
      'templates': {
        'custom.mustache': '# {{name}} - Custom Template\n\n{{summary}}\n\n## Experience\n{{#experience}}\n* {{position}} at {{company}}\n{{/experience}}'
      }
    });
  });

  afterEach(() => {
    // Restore fs
    mockFs.restore();
  });

  test('should generate complete resume with all data fields', () => {
    const resume = generateResume({
      industry: 'tech',
      experienceYears: 5,
      format: 'both'
    });
    
    // Check that all expected sections are present in the JSON output
    expect(resume.json).toHaveProperty('name');
    expect(resume.json).toHaveProperty('contactInfo');
    expect(resume.json).toHaveProperty('summary');
    expect(resume.json).toHaveProperty('experience');
    expect(resume.json.experience.length).toBeGreaterThan(0);
    expect(resume.json).toHaveProperty('education');
    expect(resume.json).toHaveProperty('skillCategories');
    
    // Check contactInfo structure
    expect(resume.json.contactInfo).toHaveProperty('email');
    expect(resume.json.contactInfo).toHaveProperty('phone');
    expect(resume.json.contactInfo).toHaveProperty('location');
    
    // Check that experience entries have the right structure
    const exp = resume.json.experience[0];
    expect(exp).toHaveProperty('position');
    expect(exp).toHaveProperty('company');
    expect(exp).toHaveProperty('startDate');
    expect(exp).toHaveProperty('endDate');
    expect(exp).toHaveProperty('bulletPoints');
    expect(Array.isArray(exp.bulletPoints)).toBe(true);
    
    // Check that the markdown was generated
    expect(typeof resume.markdown).toBe('string');
    expect(resume.markdown.length).toBeGreaterThan(100);
  });

  test('should change experience level based on years parameter', () => {
    const juniorResume = generateResume({
      experienceYears: 2,
      format: 'json'
    });
    
    const seniorResume = generateResume({
      experienceYears: 10,
      format: 'json'
    });
    
    // Junior should have fewer experiences than senior
    expect(juniorResume.json.experience.length).toBeLessThan(seniorResume.json.experience.length);
    
    // Check that summaries reflect experience level
    expect(juniorResume.json.summary).toContain('Enthusiastic');
    expect(seniorResume.json.summary).toContain('Seasoned');
  });

  test('should generate different content for different industries', () => {
    const techResume = generateResume({
      industry: 'tech',
      format: 'json'
    });
    
    const financeResume = generateResume({
      industry: 'finance',
      format: 'json'
    });
    
    // Skills should be different between industries
    const techSkills = techResume.json.skillCategories[0].skills;
    const financeSkills = financeResume.json.skillCategories[0].skills;
    expect(techSkills).not.toBe(financeSkills);
    
    // Job titles should be different
    const techJobTitle = techResume.json.experience[0].position;
    const financeJobTitle = financeResume.json.experience[0].position;
    expect(techJobTitle).not.toBe(financeJobTitle);
  });

  test('should use custom template when provided', () => {
    const resume = generateResume({
      template: fs.readFileSync('templates/custom.mustache', 'utf8'),
      format: 'both'
    });
    
    // Check that the custom template format was used
    expect(resume.markdown).toContain('Custom Template');
    expect(resume.markdown).toContain('* ');  // Bullet format in the custom template
  });

  test('should respect gender option', () => {
    // Instead of testing with a mock, let's test the actual behavior
    // Generate two resumes with different genders and check that they're different
    
    // Set a consistent seed first
    const { faker } = require('@faker-js/faker');
    faker.seed(123);
    
    const maleResume = generateResume({
      gender: 'male',
      format: 'json'
    });
    
    // Reset the seed to get the same "random" values except for gender
    faker.seed(123);
    
    const femaleResume = generateResume({
      gender: 'female',
      format: 'json'
    });
    
    // The names should be different if gender is respected
    expect(maleResume.json.name).not.toBe(femaleResume.json.name);
  });

  test('should handle includeLinkedin and includeWebsite options', () => {
    const withBoth = generateResume({
      includeLinkedin: true,
      includeWebsite: true,
      format: 'json'
    });
    
    const withoutBoth = generateResume({
      includeLinkedin: false,
      includeWebsite: false,
      format: 'json'
    });
    
    expect(withBoth.json.contactInfo.linkedin).not.toBeNull();
    expect(withBoth.json.contactInfo.website).not.toBeNull();
    
    expect(withoutBoth.json.contactInfo.linkedin).toBeNull();
    expect(withoutBoth.json.contactInfo.website).toBeNull();
  });
});