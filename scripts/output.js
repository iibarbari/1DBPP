const _ = require('lodash');
const path = require('path');
const json2xls = require('json2xls');
const fs = require('fs');

class Output {
  constructor(data, withPackageCode) {
    this.data = data;
    this.binData = [];
    this.itemData = [];
    this.withPackageCode = withPackageCode;

    this.createBinData();
    this.createItemsData();
  }

  createBinData() {
    this.binData = this.withPackageCode
      ? this.data.map(({ id, size, storeId, residualCapacity, packageCode }) => {
          return {
            id,
            storeId,
            packageCode,
            size,
            residualCapacity,
            used: size - residualCapacity,
            usage: `${(((size - residualCapacity) / size) * 100).toFixed(2)}%`,
          };
        })
      : this.data
          .map(({ id, size, storeId, residualCapacity }) => {
            return {
              id,
              storeId,
              size,
              residualCapacity,
              used: size - residualCapacity,
              usage: `${(((size - residualCapacity) / size) * 100).toFixed(2)}%`,
            };
          })
          .filter(({ id }) => id !== undefined);
  }

  createItemsData() {
    this.itemData = this.withPackageCode
      ? _.flatMap(
          _.map(this.data, (b) =>
            b.items.map((i) => {
              return i;
            })
          )
        )
      : _.flatMap(this.data);
  }

  writeToFile() {
    const xlsItems = json2xls(this.itemData);
    const xlsBins = json2xls(this.binData);

    fs.writeFileSync(path.resolve(__dirname, '../', `items.xlsx`), xlsItems, 'binary');
    fs.writeFileSync(path.resolve(__dirname, '../', `bins.xlsx`), xlsBins, 'binary');

    // fs.writeFileSync(path.resolve(__dirname, '../', `bins.json`), JSON.stringify(this.binData));
    // fs.writeFileSync(path.resolve(__dirname, '../', `items.json`), JSON.stringify(this.itemData));
  }
}

module.exports = { Output };
