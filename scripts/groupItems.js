const _ = require('lodash');

module.exports = (items) => {
  const stores = _.mapValues(_.groupBy(items, 'store'), (itemsList) =>
    itemsList.map((items) => _.omit(items, 'store'))
  );

  const deneme = _.mapValues(stores, (storeList) => {
    return _.mapValues(_.groupBy(stores['281'], 'packageCode'), (sList) =>
      sList.map((s) => _.omit(s, 'packageCode'))
    );
  });

  // const packageCodes = Object.keys(stores).map((store) => {
  //   const group = _.mapValues(
  //     _.groupBy(stores[store], 'packageCode'),
  //     (storeList) => storeList.map((s) => _.omit(s, 'packageCode'))
  //   );
  //   return group
  // });

  console.log(deneme['37']['BG'], deneme['37']['BG'].length);
};
