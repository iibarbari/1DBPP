const { groupItems, parseData } = require('./scripts/index');
const fs = require('fs');

// Multiply item per package \* volume per item
// Remove package rule
// Consider demand
// Parse data
const items = parseData(fs.readFileSync('./Veri_57.csv', 'utf8'));

// Create subgroups based on packageCode and store
groupItems(items);
