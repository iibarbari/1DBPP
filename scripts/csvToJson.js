const fs = require('fs');
const path = require('path');

class CSVtoJSON {
  constructor(csvFileName, fileName) {
    this.csv = csvFileName;
    this.file = fileName;
  }

  convert() {
    const lines = fs.readFileSync(path.resolve(this.csv), 'utf-8').split('\n');
    const result = [];

    lines.forEach((l) => {
      const line = l.replace('\r', '').split(',');
      const itemObj = {
        id: parseInt(line[0], 10),
        store: parseInt(line[1], 10),
        demand: parseInt(line[2], 10),
        packageCode: line[5].trim(),
        volume: parseFloat((parseFloat(line[3]) * parseFloat(line[4])).toFixed(2)),
        totalVolume: parseFloat(
          (parseFloat(line[3]) * parseFloat(line[4])).toFixed(2) * parseInt(line[2], 10)
        ),
        packageOrder: parseInt(line[7], 10),
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
