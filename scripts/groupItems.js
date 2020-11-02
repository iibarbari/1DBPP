const _ = require('lodash');

module.exports = (items) => {
  const stores = _.mapValues(_.groupBy(items, 'store'), (itemsList) =>
    itemsList.map((items) => _.omit(items, 'store'))
  );

  const packageCodes = _.mapValues(stores, (storeList) => {
    return _.mapValues(_.groupBy(storeList, 'packageCode'), (sList) =>
      sList.map((s) => _.omit(s, 'packageCode'))
    );
  });

  return packageCodes;
};
