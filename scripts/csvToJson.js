const fs = require('fs');
const path = require('path');

class CSVtoJSON {
  constructor(csvFileName, fileName) {
    this.csv = csvFileName;
    this.file = fileName;
    this.order = {
      id: 0,
      store: 1,
      demand: 2,
      numberOfPacks: 3,
      avgVolume: 4,
      packageCode: 5,
    };
  }

  convert() {
    const lines = fs.readFileSync(path.resolve(this.csv), 'utf-8').split('\n');
    const result = [];

    lines.forEach((l) => {
      const line = l.replace('\r', '').split(',');

      const itemObj = {
        id: Number(line[this.order.id]),
        store: Number(line[this.order.store]),
        demand: Number(line[this.order.demand]),
        numberOfPacks: Number(line[this.order.numberOfPacks]),
        avgVolume: Number(line[this.order.avgVolume]),
        packageCode: line[this.order.packageCode].trim(),
        volume:
          line[this.order.demand] * line[this.order.numberOfPacks] * line[this.order.avgVolume],
      };

      result.push(itemObj);
    });

    result.shift();

    return result;
  }

  writeToFile() {
    const data = this.convert();

    fs.writeFile(
      path.resolve(__dirname, '../', `${this.file}.json`),
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
      }
    );

    return data;
  }
}

module.exports = { CSVtoJSON };
