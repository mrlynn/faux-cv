const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const pdfStyles = require('../templates/styles');

/**
 * Generate a batch PDF from multiple markdown files
 * @param {string[]} markdownFiles Array of paths to markdown files
 * @param {string} outputFile Path to the output PDF file
 * @param {Object} options PDF generation options
 * @param {string} options.style PDF style (default, modern, minimal, professional)
 * @param {string} options.color Primary color (hex code)
 * @param {string[]} options.names Array of resume names
 * @returns {Promise<void>} Promise that resolves when PDF is generated
 */
async function generateBatchPDF(markdownFiles, outputFile, options = {}) {
  try {
    // Dynamically import the required modules only when needed
    const showdown = require('showdown');
    const puppeteer = require('puppeteer');
    
    const style = options.style || 'default';
    const color = options.color || '#0066cc';
    const names = options.names || [];
    
    // Get the CSS for the selected style with page break support
    const css = pdfStyles.getStyleWithPageBreaks(style, color);
    
    // Convert markdown to HTML for each file and combine them
    const converter = new showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true
    });
    
    let combinedHtml = '';
    
    // Process each markdown file and add page breaks between them
    for (let i = 0; i < markdownFiles.length; i++) {
      const markdown = fs.readFileSync(markdownFiles[i], 'utf8');
      const html = converter.makeHtml(markdown);
      
      // Get the resume name for this file
      const resumeName = i < names.length ? names[i] : `Resume ${i+1}`;
      
      // Wrap each resume in a div with a data attribute for identification
      combinedHtml += `<div class="resume" data-name="${resumeName}">${html}</div>`;
      
      // Add page break after each resume except the last one
      if (i < markdownFiles.length - 1) {
        combinedHtml += '<div class="page-break"></div>';
      }
    }
    
    // Create a full HTML document with styles
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Batch Resumes</title>
        <style>
          ${css}
          .resume {
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        ${combinedHtml}
      </body>
      </html>
    `;
    
    // Create a temporary HTML file
    const tempHtmlFile = `${path.dirname(outputFile)}/.temp-batch-resumes.html`;
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
    console.error(chalk.red(`Error generating batch PDF: ${error.message}`));
    throw error;
  }
}

module.exports = {
  generateBatchPDF
};