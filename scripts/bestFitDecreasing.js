const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const dummyData = require('../dummy');

class BestFitDecreasing {
  constructor(storeId, items, binCapacities = [17, 22, 33]) {
    this.bins = [];
    this.items = items;
    this.capacities = binCapacities.sort((a, b) => a - b);
    this.capacity = 0;
    this.storeId = storeId;
    this.totalWeight = _.sumBy(items, 'volume');
  }

  get placeItems() {
    this.sortWeights();
    this.mapWeights();

    return this.bins;
  }

  get details() {
    const bins = this.placeItems;

    return `${bins.length} bins created for ${this.items.length} items`;
  }

  sortWeights() {
    this.items = _.orderBy(this.items, 'volume', 'desc');
  }

  createNewBin(item) {
    this.decideBinSize();

    this.bins.push({
      id: this.bins.length,
      // volumes: [item.volume],
      items: [item],
      storeId: this.storeId,
      size: this.capacity,
      residualCapacity: this.capacity - item.volume,
    });
  }

  decideBinSize() {
    const totalPlaced = _.sumBy(
      _.flatMap(this.bins, (b) => b.items),
      'volume'
    );
    const neededSpace = this.totalWeight - totalPlaced;

    let decided;

    if (neededSpace >= _.max(this.capacities)) {
      decided = _.max(this.capacities);
    } else if (neededSpace <= _.min(this.capacities)) {
      decided = _.min(this.capacities);
    } else {
      decided = this.capacities.find((b) => b > neededSpace);
    }

    this.capacity = decided;
  }

  chooseBin(item) {
    const sortedBoxes = _.orderBy(this.bins, 'residualCapacity', 'desc');
    const availableBinIndex = this.bins.indexOf(
      sortedBoxes.find((box) => box.residualCapacity >= item.volume)
    );

    return availableBinIndex;
  }

  mapWeights() {
    this.items.forEach((item) => {
      const availableBinIndex = this.chooseBin(item);

      if (this.bins.length === 0 || availableBinIndex < 0) {
        this.createNewBin(item);
      } else {
        this.bins[availableBinIndex] = {
          ...this.bins[availableBinIndex],
          // volumes: [...this.bins[availableBinIndex].volumes, item.volume],
          items: [...this.bins[availableBinIndex].items, item],
          residualCapacity: _.round(this.bins[availableBinIndex].residualCapacity - item.volume, 2),
        };
      }
    });
  }
}

module.exports = { BestFitDecreasing };

// const capacity = [17, 22, 33];
// const boxes = new BestFitDecreasing('351', dummyData, capacity).placeItems;
// // eslint-disable-next-line no-console
// console.log(boxes);
