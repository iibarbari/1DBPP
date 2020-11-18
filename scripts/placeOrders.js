const _ = require('lodash');

// This function is executed for each store and each packageCode.

module.exports = (items, store, packageCode) => {
  const binSizes = [17, 22, 33];
  const boxes = [];
  const initialItems = items.length;
  const dummyItems = items;
  const self = {};
  const current = {
    binSize: '',
    residualCapacity: '',
    items: [],
    length: 0,
  };

  self.init = () => {
    if (store === '265' && packageCode === 'DX0') {
      self.placeItems();
    }
    console.log(boxes, current);
  };

  self.placeItems = () => {
    items.forEach((item, index) => {
      // console.log({ vol: item.volume, index, length: items.length });
      const algo = {
        boxHasSpace: false,
        currentHasSpace: false,
        newBox: false,
      };
      // 1. Kutularda yer olabilir
      // 2. Current'da yer olabilir
      // 3. Yeni bir kutu acilip oraya yerlestirilebilir

      // Place order to another box w residual capacity
      const availableBox = _.sortBy(boxes, 'residualCapacity').find((box) => {
        return box.residualCapacity > item.volume ? box : false;
      });

      const availableBoxIndex = availableBox
        ? _.findIndex(boxes, ['binId', availableBox.binId])
        : -1;

      algo.boxHasSpace = availableBoxIndex > -1;

      // Place order to current box w residual capacity
      algo.currentHasSpace = current.residualCapacity > item.volume && current.residualCapacity > 0;

      if (algo.boxHasSpace) {
        boxes[availableBoxIndex].items.push(item);
        boxes[availableBoxIndex].residualCapacity -= item.volume;
      } else if (algo.currentHasSpace) {
        self.updateCurrent(item);

        if (initialItems - 1 === index) {
          self.pushBinToBox();
        }
      } else {
        self.pushBinToBox();
        self.initCurrent(item);
      }
    });
  };

  self.resetCurrent = () => {
    current.binSize = '';
    current.residualCapacity = '';
    current.items = [];
  };

  self.initCurrent = (item) => {
    const sum = _.round(_.sumBy(dummyItems, 'volume'), 2);
    const binSize = binSizes.find((size) => size > sum) || _.max(binSizes);

    current.binSize = binSize;
    current.residualCapacity = binSize;
    current.length = 0;
    current.items = [];

    if (item) {
      current.items.push(item);
      current.residualCapacity -= item.volume;
      current.length = current.items.length;
    }
  };

  self.updateCurrent = (item) => {
    current.items.push(item);
    current.residualCapacity -= item.volume;
    current.length = current.items.length;
  };

  self.pushBinToBox = () => {
    if (current.items.length > 0) {
      boxes.push({
        binSize: current.binSize,
        binId: `${store}-${packageCode}-${boxes.length}`,
        items: current.items,
        length: current.items.length,
        residualCapacity: current.binSize - _.sumBy(current.items, 'volume'),
      });

      self.resetCurrent();
    }
  };

  self.init();
};
