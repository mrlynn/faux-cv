const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pdfStyles = require('../templates/styles');

/**
 * Generate a PDF from a markdown file
 * @param {string} markdownFile Path to the markdown file
 * @param {string} outputFile Path to the output PDF file
 * @param {Object} options PDF generation options
 * @param {string} options.style PDF style (default, modern, minimal, professional)
 * @param {string} options.color Primary color (hex code)
 * @param {string} options.name Resume name for title
 * @returns {Promise<void>} Promise that resolves when PDF is generated
 */
async function generatePDF(markdownFile, outputFile, options = {}) {
  try {
    // Dynamically import the required modules only when PDF generation is needed
    // This prevents errors if these dependencies aren't installed
    const showdown = require('showdown');
    const puppeteer = require('puppeteer');
    
    const style = options.style || 'default';
    const color = options.color || '#0066cc';
    const name = options.name || 'Resume';
    
    // Get the appropriate CSS for the selected style
    const css = pdfStyles.getStyle(style, color);
    
    // Convert markdown to HTML using showdown
    const converter = new showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true
    });
    
    const markdown = fs.readFileSync(markdownFile, 'utf8');
    const html = converter.makeHtml(markdown);
    
    // Create a full HTML document with styles
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${name} - Resume</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    
    // Create a temporary HTML file
    const tempHtmlFile = `${path.dirname(outputFile)}/.temp-${path.basename(outputFile, '.pdf')}.html`;
    fs.writeFileSync(tempHtmlFile, fullHtml);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new' // Use new headless mode for newer Puppeteer versions
    });
    const page = await browser.newPage();
    
    // Load the HTML file
    await page.goto(`file://${path.resolve(tempHtmlFile)}`, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    await page.pdf({
      path: outputFile,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    });
    
    // Close the browser
    await browser.close();
    
    // Remove the temporary HTML file
    fs.unlinkSync(tempHtmlFile);
  } catch (error) {
    console.error(chalk.red(`Error generating PDF: ${error.message}`));
    throw error;
  }
}

module.exports = {
  generatePDF
};