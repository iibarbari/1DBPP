module.exports = (csv) => {
  const lines = csv.split('\n');
  const result = [];

  lines.map((l) => {
    const line = l.replace('\r', '').split(',');
    const itemObj = {
      id: parseInt(line[0]),
      store: parseInt(line[1]),
      demand: parseInt(line[2]),
      packageCode: line[5].trim(),
      volume: parseFloat(
        (parseFloat(line[3]) * parseFloat(line[4])).toFixed(2)
      ),
      packageOrder: parseInt(line[7]),
    };

    result.push(itemObj);
  });

  result.shift();

  return result;
};
