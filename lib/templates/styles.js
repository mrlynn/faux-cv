/**
 * PDF styles for different resume formats
 */

/**
 * Get CSS for the specified style
 * @param {string} style Style name (default, modern, minimal, professional)
 * @param {string} color Primary color (hex code)
 * @returns {string} CSS styling
 */
function getStyle(style, color) {
  const styles = {
    default: `
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        color: ${color};
        border-bottom: 2px solid ${color};
        padding-bottom: 5px;
      }
      h2 {
        color: ${color};
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
      }
      h3 {
        margin-bottom: 5px;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
    `,
    modern: `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #333;
      }
      h1 {
        color: ${color};
        font-size: 28px;
        letter-spacing: -0.5px;
        margin-bottom: 5px;
      }
      h2 {
        color: ${color};
        font-size: 22px;
        letter-spacing: -0.5px;
        margin-top: 25px;
        border-left: 4px solid ${color};
        padding-left: 10px;
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
        font-weight: 600;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
      ul {
        padding-left: 20px;
      }
    `,
    minimal: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #222;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 5px;
        font-weight: 500;
      }
      h2 {
        font-size: 18px;
        margin-top: 25px;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        font-weight: 500;
        color: ${color};
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
        font-weight: 500;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
      ul {
        padding-left: 20px;
      }
    `,
    professional: `
      body {
        font-family: 'Garamond', 'Times New Roman', serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #222;
      }
      h1 {
        font-size: 28px;
        text-align: center;
        margin-bottom: 5px;
        color: ${color};
      }
      h2 {
        font-size: 22px;
        margin-top: 25px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        color: ${color};
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      a {
        color: ${color};
        text-decoration: none;
      }
      ul {
        padding-left: 20px;
      }
    `
  };
  
  return styles[style] || styles.default;
}

/**
 * Get CSS for the specified style with additional page break support
 * @param {string} style Style name (default, modern, minimal, professional)
 * @param {string} color Primary color (hex code)
 * @returns {string} CSS styling with page break rules
 */
function getStyleWithPageBreaks(style, color) {
  const baseStyle = getStyle(style, color);
  
  // Add page break class
  const pageBreakStyle = `
    /* Page break class for multi-resume PDFs */
    .page-break {
      page-break-after: always;
      height: 0;
      margin: 0;
    }
  `;
  
  return baseStyle + pageBreakStyle;
}

module.exports = {
  getStyle,
  getStyleWithPageBreaks
};