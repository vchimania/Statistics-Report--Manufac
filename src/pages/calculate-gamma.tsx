import { ClassStats, WineEntry, data } from "../components/helpers";

// Calculate Gamma value for an entry
const calculateGamma = (entry: WineEntry): number => {
  const ash = typeof entry.Ash === "number" ? entry.Ash : parseFloat(entry.Ash);
  const hue = entry.Hue;
  const magnesium = entry.Magnesium;

  return (ash * hue) / magnesium;
};

// Calculate mean of an array of values
const calculateMean = (values: number[]): number => {
  const total = values.reduce((acc, val) => acc + val, 0);
  return parseFloat((total / values.length).toFixed(3));
};

// Calculate median of an array of values
const calculateMedian = (values: number[]): number => {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return parseFloat(
      ((sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2).toFixed(
        3
      )
    );
  } else {
    return parseFloat(sortedValues[middleIndex].toFixed(3));
  }
};

// Calculate mode of an array of values
const calculateMode = (values: number[]): number[] => {
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
};

const calculateClassWiseGammaStats = (data: WineEntry[]): ClassStats[] => {
  const classGamma: { [key: number]: number[] } = {};

  // Calculate Gamma values for each entry and organize them by class
  data.forEach((entry) => {
    const alcoholClass = entry.Alcohol;
    const gammaValue = calculateGamma(entry);

    if (!classGamma[alcoholClass]) {
      classGamma[alcoholClass] = [];
    }

    classGamma[alcoholClass].push(gammaValue);
  });

  const classStats: ClassStats[] = [];

  // Calculate mean, median, and mode for Gamma values for each class
  for (const alcoholClass in classGamma) {
    const gammaValues = classGamma[alcoholClass];

    const mean = calculateMean(gammaValues);
    const median = calculateMedian(gammaValues);
    const mode = calculateMode(gammaValues);

    classStats.push({
      class: parseInt(alcoholClass),
      mean,
      median,
      mode,
    });
  }

  return classStats;
};

// Calculate class-wise Gamma statistics for the given data
const classWiseGammaStats = calculateClassWiseGammaStats(data);

const GammaTable = () => {
  return (
    <table className="styled-table" style={{ margin: "auto" }}>
      <thead>
        <tr>
          <th>Measure</th>
          {classWiseGammaStats.map((stat) => (
            <th key={stat.class}>Class {stat.class}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Gamma Mean</th>
          {classWiseGammaStats.map((stat) => (
            <td key={stat.class}>{stat.mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Gamma Median</th>
          {classWiseGammaStats.map((stat) => (
            <td key={stat.class}>{stat.median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Gamma Mode</th>
          {classWiseGammaStats.map((stat) => (
            <td key={stat.class}>
              {stat.mode.map((value) => value.toFixed(3)).join(", ")}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default GammaTable;
