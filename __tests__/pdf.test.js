// __tests__/pdf.test.js

const { generatePDF } = require('../lib/pdf/generator');
const { generateBatchPDF } = require('../lib/pdf/batchGenerator');
const pdfStyles = require('../lib/templates/styles');
const fs = require('fs');
const path = require('path');

// Check if puppeteer and showdown are available
let puppeteerAvailable = false;
let showdownAvailable = false;
try {
  require('puppeteer');
  puppeteerAvailable = true;
} catch (e) {
  console.log('Puppeteer not available, skipping PDF generation tests');
}

try {
  require('showdown');
  showdownAvailable = true;
} catch (e) {
  console.log('Showdown not available, skipping PDF generation tests');
}

const shouldRunPdfTests = puppeteerAvailable && showdownAvailable;

// Mock fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue('# Markdown Content'),
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn()
}));

// Mock path module
jest.mock('path', () => ({
  dirname: jest.fn().mockReturnValue('/mock/dir'),
  basename: jest.fn().mockReturnValue('resume.pdf'),
  resolve: jest.fn().mockReturnValue('/mock/dir/full/path')
}));

// Only mock these if we're running the PDF tests
if (shouldRunPdfTests) {
  // Mock puppeteer
  jest.mock('puppeteer', () => {
    const mockPage = {
      goto: jest.fn().mockResolvedValue({}),
      pdf: jest.fn().mockResolvedValue({})
    };
    
    const mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn().mockResolvedValue({})
    };
    
    return {
      launch: jest.fn().mockResolvedValue(mockBrowser)
    };
  });

  // Mock showdown
  jest.mock('showdown', () => {
    const mockConverter = {
      makeHtml: jest.fn().mockReturnValue('<h1>HTML Content</h1>')
    };
    
    return {
      Converter: jest.fn().mockImplementation(() => mockConverter)
    };
  });
}

// Mock chalk
jest.mock('chalk', () => ({
  red: jest.fn(text => `RED: ${text}`)
}));

describe('PDF Generation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PDF Styles', () => {
    test('should return default style when no style specified', () => {
      const css = pdfStyles.getStyle(undefined, '#0066cc');
      expect(css).toContain('font-family: Arial, sans-serif');
      expect(css).toContain('color: #0066cc');
    });

    test('should return requested style', () => {
      const modernCss = pdfStyles.getStyle('modern', '#ff0000');
      expect(modernCss).toContain('font-family: \'Segoe UI\'');
      expect(modernCss).toContain('color: #ff0000');

      const minimalCss = pdfStyles.getStyle('minimal', '#ff0000');
      expect(minimalCss).toContain('font-family: -apple-system');

      const professionalCss = pdfStyles.getStyle('professional', '#ff0000');
      expect(professionalCss).toContain('font-family: \'Garamond\'');
    });

    test('should add page break styles', () => {
      const css = pdfStyles.getStyleWithPageBreaks('default', '#0066cc');
      expect(css).toContain('page-break-after: always');
    });
  });

  // Only run these tests if puppeteer and showdown are available
  (shouldRunPdfTests ? describe : describe.skip)('Single PDF Generator', () => {
    test('should generate a PDF from markdown', async () => {
      const showdown = require('showdown');
      const puppeteer = require('puppeteer');
      
      await generatePDF('input.md', 'output.pdf', {
        style: 'modern',
        color: '#ff0000',
        name: 'Test Resume'
      });
      
      // Check if markdown was read
      expect(fs.readFileSync).toHaveBeenCalledWith('input.md', 'utf8');
      
      // Check if HTML was converted
      const mockConverter = new showdown.Converter();
      expect(mockConverter.makeHtml).toHaveBeenCalled();
      
      // Check if temp HTML file was created
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.temp-'),
        expect.stringContaining('<html>')
      );
      
      // Check if Puppeteer was launched
      expect(puppeteer.launch).toHaveBeenCalled();
      
      // Check if PDF was generated
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      expect(page.goto).toHaveBeenCalledWith(
        expect.stringContaining('file://'),
        expect.anything()
      );
      expect(page.pdf).toHaveBeenCalledWith(expect.objectContaining({
        path: 'output.pdf',
        format: 'A4'
      }));
      
      // Check if browser was closed
      expect(browser.close).toHaveBeenCalled();
      
      // Check if temp file was deleted
      expect(fs.unlinkSync).toHaveBeenCalled();
    });

    test('should handle errors gracefully', async () => {
      // Mock fs.readFileSync to throw an error
      fs.readFileSync.mockImplementationOnce(() => {
        throw new Error('File not found');
      });
      
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      await expect(generatePDF('nonexistent.md', 'output.pdf')).rejects.toThrow('File not found');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('RED: Error generating PDF'));
      
      consoleErrorSpy.mockRestore();
    });
  });

  // Only run these tests if puppeteer and showdown are available
  (shouldRunPdfTests ? describe : describe.skip)('Batch PDF Generator', () => {
    test('should generate a batch PDF from multiple markdown files', async () => {
      const showdown = require('showdown');
      const puppeteer = require('puppeteer');
      
      await generateBatchPDF(
        ['resume1.md', 'resume2.md'],
        'batch-output.pdf',
        {
          style: 'professional',
          color: '#00cc66',
          names: ['John Doe', 'Jane Smith']
        }
      );
      
      // Check if showdown converter was created
      expect(showdown.Converter).toHaveBeenCalled();
      
      // Check if markdown files were read
      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
      expect(fs.readFileSync).toHaveBeenCalledWith('resume1.md', 'utf8');
      expect(fs.readFileSync).toHaveBeenCalledWith('resume2.md', 'utf8');
      
      // Check if HTML was written with resume divs and page breaks
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('data-name="John Doe"')
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('data-name="Jane Smith"')
      );
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('class="page-break"')
      );
      
      // Check if PDF was generated
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      expect(page.pdf).toHaveBeenCalledWith(expect.objectContaining({
        path: 'batch-output.pdf'
      }));
    });

    test('should handle missing names gracefully', async () => {
      const showdown = require('showdown');
      
      await generateBatchPDF(
        ['resume1.md', 'resume2.md', 'resume3.md'],
        'batch-output.pdf',
        {
          names: ['John Doe'] // Only one name for three resumes
        }
      );
      
      // Check if HTML contains default names for missing entries
      const writeFileContent = fs.writeFileSync.mock.calls[0][1];
      expect(writeFileContent).toContain('data-name="John Doe"');
      expect(writeFileContent).toContain('data-name="Resume 2"');
      expect(writeFileContent).toContain('data-name="Resume 3"');
    });
  });
});