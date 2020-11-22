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
}

module.exports = { GroupItems };
