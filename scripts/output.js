const _ = require('lodash');
const path = require('path');
const json2xls = require('json2xls');
const fs = require('fs');

class Output {
  constructor(data) {
    this.data = data;
    this.binData = [];
    this.itemData = [];

    this.createBinData();
    this.createItemsData();
  }

  createBinData() {
    this.binData = this.data.map(({ id, size, storeId, residualCapacity, packageCode }) => {
      return {
        id,
        storeId,
        packageCode,
        size,
        residualCapacity,
        used: size - residualCapacity,
        usage: `${(((size - residualCapacity) / size) * 100).toFixed(2)}%`,
      };
    });
  }

  createItemsData() {
    this.itemData = _.flatMap(
      _.map(this.data, (b) =>
        b.items.map((i) => {
          return i;
        })
      )
    );
  }

  writeToFile() {
    const xlsItems = json2xls(this.itemData);
    const xlsBins = json2xls(this.binData);

    fs.writeFileSync(path.resolve(__dirname, '../', `items.xlsx`), xlsItems, 'binary');
    fs.writeFileSync(path.resolve(__dirname, '../', `bins.xlsx`), xlsBins, 'binary');
  }
}

module.exports = { Output };
