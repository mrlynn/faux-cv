// __tests__/core.test.js

const { generateResume, availableIndustries } = require('../lib/index');
const mustache = require('mustache');

// Mock the individual generators
jest.mock('../lib/generators', () => ({
  generateBasicInfo: jest.fn().mockReturnValue({
    name: 'John Doe',
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/john-doe',
      website: 'johndoe.com'
    }
  }),
  generateSummary: jest.fn().mockReturnValue('Professional summary text'),
  generateExperience: jest.fn().mockReturnValue([
    {
      position: 'Software Engineer',
      company: 'TechCorp',
      startDate: 'January 2020',
      endDate: 'Present',
      bulletPoints: ['Achievement 1', 'Achievement 2']
    }
  ]),
  generateEducation: jest.fn().mockReturnValue([
    {
      degree: 'Bachelor\'s',
      field: 'Computer Science',
      institution: 'State University',
      graduationYear: 2019,
      details: ['GPA: 3.8']
    }
  ]),
  generateSkills: jest.fn().mockReturnValue([
    {
      category: 'Technical Skills',
      skills: 'JavaScript, React, Node.js'
    },
    {
      category: 'Soft Skills',
      skills: 'Communication, Leadership'
    }
  ]),
  generateCertifications: jest.fn().mockReturnValue([
    'AWS Certified Developer'
  ])
}));

// Mock mustache
jest.mock('mustache', () => ({
  render: jest.fn().mockReturnValue('Rendered Markdown Content')
}));

describe('Resume Generation Core', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should export available industries', () => {
    expect(Array.isArray(availableIndustries)).toBe(true);
    expect(availableIndustries.length).toBeGreaterThan(0);
    expect(availableIndustries).toContain('tech');
  });

  test('should generate resume with default options', () => {
    const result = generateResume();
    
    expect(result).toHaveProperty('json');
    expect(result).toHaveProperty('markdown');
    
    expect(result.json).toHaveProperty('name', 'John Doe');
    expect(result.json).toHaveProperty('summary', 'Professional summary text');
    expect(result.json).toHaveProperty('experience');
    expect(result.json).toHaveProperty('education');
    expect(result.json).toHaveProperty('skillCategories');
    expect(result.json).toHaveProperty('certifications');
    
    expect(mustache.render).toHaveBeenCalled();
    expect(result.markdown).toBe('Rendered Markdown Content');
  });

  test('should respect format option', () => {
    // JSON only
    const jsonResult = generateResume({ format: 'json' });
    expect(jsonResult).toHaveProperty('json');
    expect(jsonResult).not.toHaveProperty('markdown');
    
    // Markdown only
    const markdownResult = generateResume({ format: 'markdown' });
    expect(markdownResult).not.toHaveProperty('json');
    expect(markdownResult).toHaveProperty('markdown');
  });

  test('should throw error for invalid industry', () => {
    expect(() => {
      generateResume({ industry: 'invalid-industry' });
    }).toThrow('Invalid industry');
  });

  test('should pass options to generators', () => {
    const generators = require('../lib/generators');
    
    const options = {
      industry: 'finance',
      experienceYears: 8,
      gender: 'female',
      includeLinkedin: false,
      includeWebsite: false
    };
    
    generateResume(options);
    
    // Check if options were passed to the generators
    expect(generators.generateBasicInfo).toHaveBeenCalledWith(expect.objectContaining({
      gender: 'female',
      includeLinkedin: false,
      includeWebsite: false
    }));
    
    expect(generators.generateSummary).toHaveBeenCalledWith(
      expect.anything(),
      8,
      expect.anything()
    );
  });

  test('should use custom template if provided', () => {
    const customTemplate = '# Custom {{name}} Template';
    generateResume({ template: customTemplate });
    
    expect(mustache.render).toHaveBeenCalledWith(
      customTemplate,
      expect.anything()
    );
  });
});