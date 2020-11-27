const _ = require('lodash');

class GroupItems {
  constructor(data) {
    this.data = data;
  }

  get extractStores() {
    return _.mapValues(_.groupBy(this.data, 'store'), (stores) =>
      stores.map((store) => _.omit(store, 'store'))
    );
  }

  get extractPackageCodes() {
    const stores = this.extractStores;

    let packageCodes = {};

    Object.keys(this.extractStores).forEach((store) => {
      stores[store] = _.groupBy(this.extractStores[store], 'packageCode');
    });

    Object.keys(stores).forEach((s) => {
      Object.keys(stores[s]).forEach((p) => {
        packageCodes = { ...packageCodes, [`${s}-${p}`]: stores[s][p] };
      });
    });

    return packageCodes;
  }
}

module.exports = { GroupItems };
