const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

require('dotenv').config();

const { csv, json } = yargs(hideBin(process.argv)).argv;

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
        packageOrder: parseInt(line[7], 10)
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

    return `CSV converted to JSON`;
  }
}

if (csv !== undefined && json !== undefined) {
  const parsed = new CSVtoJSON(csv, json).writeToFile();

  // eslint-disable-next-line no-console
  console.log(parsed);
}

module.exports = { CSVtoJSON };
