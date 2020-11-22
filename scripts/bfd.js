const _ = require('lodash');

class BestFitDecreasing {
  constructor(items, binCapacity) {
    this.bins = [];
    this.weights = items;
    this.capacity = binCapacity;
  }

  get placeItems() {
    this.sortWeights();
    this.mapWeights();

    return this.bins;
  }

  sortWeights() {
    this.weights = this.weights.sort((a, b) => b - a);
  }

  createNewBin(item) {
    this.bins.push({
      items: [item],
      residualCapacity: this.capacity - item,
    });
  }

  mapWeights() {
    this.weights.forEach((item) => {
      if (this.bins.length === 0) {
        this.createNewBin(item);
      } else {
        const sortedBoxes = _.orderBy(this.bins, 'residualCapacity', 'asc');
        const availableBinIndex = this.bins.indexOf(
          sortedBoxes.find((box) => box.residualCapacity >= item)
        );

        if (availableBinIndex < 0) {
          this.createNewBin(item);
        } else {
          this.bins[availableBinIndex].items.push(item);
          this.bins[availableBinIndex].residualCapacity -= item;
        }
      }
    });
  }
}

const weights = [11, 2, 15, 5, 6, 17, 7];
const capacity = 20;

const lel = new BestFitDecreasing(weights, capacity).placeItems;

console.log(lel);
