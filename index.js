const { BestFitDecreasing, CSVtoJSON, GroupItems, Output } = require('./scripts/index');

require('dotenv').config();

const convertedData = new CSVtoJSON('./Veri_57.csv', 'Veri_57').writeToFile();
const groupedData = new GroupItems(convertedData).extractStores;

const finalBins = [];

Object.keys(groupedData).forEach((storeId) => {
  finalBins.push(new BestFitDecreasing(storeId, groupedData[storeId]).placeItems);
});

new Output(finalBins.flat()).writeToFile();
