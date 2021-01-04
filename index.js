const { BestFitDecreasing, CSVtoJSON, GroupItems, Output } = require('./scripts/index');

require('dotenv').config();

const convertedData = new CSVtoJSON('./sampleData.csv', 'veri').convert();

// const groupedData = new GroupItems(convertedData).extractStores;
const groupedData = new GroupItems(convertedData).extractPackageCodes;

const finalBins = [];

Object.keys(groupedData).forEach((storeId) => {
  // finalBins.push(new BestFitDecreasing(storeId, groupedData[storeId]).placeItems, false);
  finalBins.push(new BestFitDecreasing(storeId, groupedData[storeId]).placeItems, true);
});

// new Output(finalBins.flat().filter((a) => a !== false), false).writeToFile();
new Output(
  finalBins.flat().filter((a) => a !== true),
  true
).writeToFile();
