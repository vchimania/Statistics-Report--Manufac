import { ClassStats, data } from "../components/helpers";

function calculateMean(values: number[]): number {
  const total = values.reduce((acc, val) => acc + val, 0);
  return total / values.length;
}

function calculateMedian(values: number[]): number {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
  } else {
    return sortedValues[middleIndex];
  }
}

function calculateMode(values: number[]): number[] {
  const frequencyMap: { [key: number]: number } = {};
  let maxFrequency = 0;
  const modes: number[] = [];

  for (const value of values) {
    if (frequencyMap[value]) {
      frequencyMap[value]++;
    } else {
      frequencyMap[value] = 1;
    }

    if (frequencyMap[value] > maxFrequency) {
      maxFrequency = frequencyMap[value];
      modes.length = 0;
      modes.push(value);
    } else if (frequencyMap[value] === maxFrequency) {
      modes.push(value);
    }
  }

  return modes;
}

const classFlavanoids: { [key: number]: number[] } = {};
data.forEach((entry) => {
  const alcoholClass = entry.Alcohol;
  const flavanoidsValue = parseFloat(entry.Flavanoids as string);

  if (!isNaN(flavanoidsValue)) {
  if (!classFlavanoids[alcoholClass]) {
    classFlavanoids[alcoholClass] = [];
  }
}

  classFlavanoids[alcoholClass].push(flavanoidsValue);
});

const classStats: ClassStats[] = [];

for (const alcoholClass in classFlavanoids) {
  const flavanoidsValues = classFlavanoids[alcoholClass];

  const mean = calculateMean(flavanoidsValues);
  const median = calculateMedian(flavanoidsValues);
  const mode = calculateMode(flavanoidsValues);

  classStats.push({
    class: parseInt(alcoholClass),
    mean,
    median,
    mode
  });
}

function StatisticsTable() {
  return (
    <table className="styled-table" style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <th>Measure</th>
          {classStats.map((stat) => (
            <th key={stat.class}>Class {stat.class}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Flavanoids Mean</th>
          {classStats.map((stat) => (
            <td key={stat.class}>{stat.mean.toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <th>Flavanoids Median</th>
          {classStats.map((stat) => (
            <td key={stat.class}>{stat.median.toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <th>Flavanoids Mode</th>
          {classStats.map((stat) => (
            <td key={stat.class}>{stat.mode.join(", ")}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default StatisticsTable;
