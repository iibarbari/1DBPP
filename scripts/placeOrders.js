const _ = require('lodash');

module.exports = (items, store, packageCode) => {
  const binSizes = [17, 22, 33];
  const sum = _.round(_.sumBy(items, 'volume'), 2);
  const binSize = binSizes.find((size) => size > sum) || _.max(binSizes);
  const boxes = [];
  const self = {};

  self.init = () => {};

  boxes.push({
    binSize,
    items: [],
  });

  items.forEach((item) => {});

  //   console.log(store, packageCode, sum, binSize, boxes, items);
};
