// const _ = require('lodash');
// const fs = require('fs');
// const { groupItems, parseData, placeOrders, sortVolumes } = require('./scripts/index');

// require('dotenv').config();

// Multiply item per package \* volume per item
// Remove package rule
// Consider demand
// Parse data
// const items = parseData(fs.readFileSync(process.env.FILE_PATH, 'utf8'));

// Create subgroups based on packageCode and store
// const subGroups = groupItems(items);
//
// // Sort each group based on volume
// const orderedItems = sortVolumes(subGroups);
//
// // Place items to boxes
// Object.keys(orderedItems).forEach((store) => {
//   const storeItems = orderedItems[store];
//
//   Object.keys(storeItems).forEach((packageCode) => {
//     // console.log(store, packageCode);
//     placeOrders(storeItems[packageCode], store, packageCode);
//   });
// });

// console.log('boxes', boxes);
// console.log(orderedItems['351']['DX0']);
