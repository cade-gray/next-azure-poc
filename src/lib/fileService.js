import { readFileSync, writeFileSync, appendFileSync } from "fs";
import path from "path";

const WEIGHTS_FILE_PATH = path.join(process.cwd(), "_data", "weights.csv");

export function readWeights() {
  try {
    const csvContent = readFileSync(WEIGHTS_FILE_PATH, "utf8");
    const lines = csvContent.trim().split("\n");

    return lines.map((line, index) => {
      const [date, value] = line.split(",");
      return {
        id: index,
        date: date.trim(),
        value: value.trim(),
      };
    });
  } catch (error) {
    console.error("Error reading weights file:", error);
    return [];
  }
}

export function addWeight(date, value) {
  try {
    const newEntry = `\n${date},${value}`;
    appendFileSync(WEIGHTS_FILE_PATH, newEntry, "utf8");
    return true;
  } catch (error) {
    console.error("Error adding weight:", error);
    return false;
  }
}

export function deleteWeight(targetDate) {
  try {
    const weights = readWeights();
    const filteredWeights = weights.filter(
      (weight) => weight.date !== targetDate
    );

    const csvContent = filteredWeights
      .map((weight) => `${weight.date},${weight.value}`)
      .join("\n");

    writeFileSync(WEIGHTS_FILE_PATH, csvContent, "utf8");
    return true;
  } catch (error) {
    console.error("Error deleting weight:", error);
    return false;
  }
}

export function updateWeights(newWeights) {
  try {
    const csvContent = newWeights
      .map((weight) => `${weight.date},${weight.value}`)
      .join("\n");

    writeFileSync(WEIGHTS_FILE_PATH, csvContent, "utf8");
    return true;
  } catch (error) {
    console.error("Error updating weights:", error);
    return false;
  }
}
