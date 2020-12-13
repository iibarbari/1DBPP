const _ = require('lodash');

class BestFitDecreasing {
  constructor(storeId, items, withPackages = true, binCapacities = [17, 22, 33]) {
    this.bins = [];
    this.items = items;
    this.capacities = binCapacities.sort((a, b) => a - b);
    this.capacity = 0;
    this.storeId = storeId;
    this.totalWeight = _.sumBy(items, 'volume');
    this.withPackages = withPackages;
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

    const binDetails = this.withPackages
      ? {
          id: `${this.storeId.split('-')[0]}-${this.bins.length}-${this.storeId.split('-')[1]}`,
          // volumes: [item.volume],
          items: [
            {
              ...item,
              storeId: this.storeId.split('-')[0],
              packageCode: this.storeId.split('-')[1],
              binId: `${this.storeId.split('-')[0]}-${this.bins.length}-${
                this.storeId.split('-')[1]
              }`,
            },
          ],
          storeId: this.storeId.split('-')[0],
          packageCode: this.storeId.split('-')[1],
          size: this.capacity,
          residualCapacity: this.capacity - item.volume,
        }
      : {
          id: this.bins.length,
          // volumes: [item.volume],
          items: [
            {
              ...item,
              storeId: this.storeId,
              binId: this.bins.length,
            },
          ],
          storeId: this.storeId,
          size: this.capacity,
          residualCapacity: this.capacity - item.volume,
        };

    this.bins.push(binDetails);
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
    return this.bins.indexOf(sortedBoxes.find((box) => box.residualCapacity >= item.volume));
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
          items: [
            ...this.bins[availableBinIndex].items,
            this.withPackages
              ? {
                  ...item,
                  storeId: this.storeId.split('-')[0],
                  packageCode: this.storeId.split('-')[1],
                  binId: this.bins[availableBinIndex].id,
                }
              : {
                  ...item,
                  storeId: this.storeId,
                  binId: this.bins[availableBinIndex].id,
                },
          ],
          residualCapacity: _.round(this.bins[availableBinIndex].residualCapacity - item.volume, 2),
        };
      }
    });
  }
}

module.exports = { BestFitDecreasing };
