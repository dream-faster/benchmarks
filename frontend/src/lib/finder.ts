const fs = require("fs");
import path from "path";
import { onlyUnique } from "@/lib/utils";

export default async function readDir(
  id: string | null,
  dirname: string,
  type_index: number
): Array<string> {
  const allResults = [];
  const files = await fs.promises.readdir(dirname);

  try {
    for (const fileName of files) {
      try {
        const dataset_name: string = fileName
          .split(" - ")
          [type_index].replace(".csv", "");
        if (id === null) {
          allResults.push(dataset_name);
        } else if (id === dataset_name) {
          const content = await fs.promises.readFile(`${dirname}/${fileName}`, {
            encoding: "utf-8",
          });
          allResults.push(content);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    return allResults;
  } catch (error) {
    console.log(error);
  }

  return allResults;
}

const resultsDirectory = path.join(process.cwd(), "results");

export async function getSortedDatasetsOrModels(type: number) {
  let datasets = await readDir(null, resultsDirectory, type);
  datasets.sort();
  datasets = datasets.filter(onlyUnique);

  return datasets;
}

export async function getAllResults(type: number) {
  let all_results = await readDir(null, resultsDirectory, type);
  all_results.sort();
  all_results = all_results.filter(onlyUnique);

  return all_results;
}
