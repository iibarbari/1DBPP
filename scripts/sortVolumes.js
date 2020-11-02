const _ = require('lodash');

module.exports = (subGroups) => {
  const sortedSubGroups = {};

  Object.keys(subGroups).forEach((store) => {
    const sg = subGroups[store];
    sortedSubGroups[store] = {};

    Object.keys(sg).forEach((packageCode) => {
      sortedSubGroups[store][packageCode] = _.orderBy(
        sg[packageCode],
        'volume',
        'desc'
      );
    });
  });

  return sortedSubGroups;
};
