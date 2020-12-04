const { BestFitDecreasing, CSVtoJSON, GroupItems, Output } = require('./scripts/index');

require('dotenv').config();

const convertedData = new CSVtoJSON('./veri.csv', 'veri').convert();

const groupedData = new GroupItems(convertedData).extractPackageCodes;

const finalBins = [];

Object.keys(groupedData).forEach((storeId) => {
  finalBins.push(new BestFitDecreasing(storeId, groupedData[storeId]).placeItems);
});

new Output(finalBins.flat()).writeToFile();
