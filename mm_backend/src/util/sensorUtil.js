require('dotenv').config();
const moment = require('moment');

// functions to validate page and page size
exports.correctPage = function (page) { // assume page is a integer
  if (page < 1) {
    return 1;
  } else {
    return page;
  }
}

exports.correctPageSize = function (pageSize) { // assume pageSize is a integer
  if (pageSize < 1 || pageSize > 40) {
    return 10;
  } else {
    return pageSize;
  }
}


// function to validate sort type and sort order
const sortTypes = [process.env.SENSOR_NAME, process.env.SENSOR_ID, process.env.SENSOR_STATUS,
process.env.CURR_TEMP, process.env.CURR_HUMIDITY, process.env.LAST_UPDATED];

exports.isValidSortType = function (sortType) {
  if (sortTypes.includes(sortType)) {
    if (sortType == process.env.SENSOR_STATUS) {
      return process.env.LAST_UPDATED;
    }
    return sortType;
  } else {
    return process.env.SENSOR_NAME; // default
  }
}

exports.isValidOrder = function (order) {
  if (order == 'asc') {
    return order;
  } else if (order == 'desc') {
    return order;
  } else { // default
    return 'asc'
  }
}

// function to validate ID TODO
exports.isValidId = function (id) {
  return id;
}

// normalize utc date to sg time
/*
  date time > 1600 = [date 1600, date + 1 1600]
  date time < 1600 = [date - 1 1600, date 1600]
*/
exports.normalizeDate = function (startDate, endDate) {
  const inputDate = moment(startDate);
  const inputEndDate = moment(endDate);
  const cutoffTime = moment(startDate).hours(21).minutes(0).seconds(0).milliseconds(0);
  console.log("moments", inputDate)

  if (inputDate.isBefore(cutoffTime)) {
    // Subtract one day and set time to 16:00
    const resultStartDate = inputDate.subtract(1, 'day').hours(16).minutes(0).seconds(0).milliseconds(0);
    const resultEndDate = inputEndDate.subtract(1, 'day').hours(16).minutes(0).seconds(0).milliseconds(0);
    
    return {
      start: resultStartDate.toISOString(),
      end: resultEndDate.add(1, 'day').toISOString(),
    };
  } else {
    // Set time to 16:00 on the same day
    const resultStartDate = inputDate.hours(16).minutes(0).seconds(0).milliseconds(0);
    const resultEndDate = inputEndDate.hours(16).minutes(0).seconds(0).milliseconds(0);
    return {
      start: resultStartDate.toISOString(),
      end: resultEndDate.add(1, 'day').toISOString(),
    };
  }
}

exports.changeDateFormat = function (dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

exports.formatTime = function (utcString) {
  const utcDate = new Date(utcString);

  // Create a new Date object adjusted for Singapore Time (UTC+8)
  const singaporeOffset = 8 * 60; // Singapore is UTC+8, so 8 hours * 60 minutes
  const singaporeDate = new Date(utcDate.getTime() + (singaporeOffset * 60 * 1000));

  // Format the result
  const formattedDate = singaporeDate.toISOString().replace('Z', '+08:00');
  return formattedDate;
}