/**
 * Utility functions for resume generation
 */

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Pick a random item from an array
   * @param {Array} array Source array
   * @returns {*} Random item
   */
  function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  /**
   * Pick multiple random items from an array
   * @param {Array} array Source array
   * @param {number} min Minimum number of items
   * @param {number} max Maximum number of items
   * @returns {Array} Array of random items
   */
  function pickMultiple(array, min, max) {
    const count = randomInt(min, max);
    const result = [];
    const copy = [...array];
    
    for (let i = 0; i < count && copy.length > 0; i++) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }
    
    return result;
  }
  
  /**
   * Generate a date range for work experience
   * @param {number} yearsAgo How many years ago the job started
   * @param {number} monthsAgo How many months ago the job ended
   * @param {boolean} isCurrent Whether this is the current job
   * @returns {Object} Object with startDate and endDate strings
   */
  function generateDateRange(yearsAgo, monthsAgo, isCurrent = false) {
    const endDate = new Date();
    if (!isCurrent) {
      endDate.setMonth(endDate.getMonth() - monthsAgo);
    }
    
    const startDate = new Date(endDate);
    startDate.setFullYear(startDate.getFullYear() - yearsAgo);
    
    const formatDate = (date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month} ${date.getFullYear()}`;
    };
    
    return {
      startDate: formatDate(startDate),
      endDate: isCurrent ? 'Present' : formatDate(endDate)
    };
  }
  
  module.exports = {
    randomInt,
    pickRandom,
    pickMultiple,
    generateDateRange
  };