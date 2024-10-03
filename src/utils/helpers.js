const { shortMonths } = require('./constants');

exports.createShortDate = (datetime) => {
  const dateObj = new Date(datetime);
  const shortMonth = shortMonths[dateObj.getMonth()];
  const day = dateObj.getDate();
  return `${shortMonth} ${day}`;
};
