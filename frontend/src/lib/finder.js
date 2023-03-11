const fs = require("fs");

export default async function readDir(id, dirname, type_index) {
    const allResults = [];   
    const files = await fs.promises.readdir(dirname);

    try {
      for (const fileName of files) {
        try {
          const dataset_name = fileName.split(" - ")[type_index].replace('.csv', '')
          if (dataset_name === id) {
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
  }