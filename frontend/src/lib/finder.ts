const fs = require("fs");

export default async function readDir(id:string|null, dirname:string, type_index:number):Array<string> {
    const allResults = [];   
    const files = await fs.promises.readdir(dirname);

    try {
      for (const fileName of files) {
        try {
          const dataset_name: string = fileName.split(" - ")[type_index].replace('.csv', '');
          if (id === null) {
            allResults.push(dataset_name);
          }
          else if(id === dataset_name) {
            const content = await fs.promises.readFile(`${dirname}/${fileName}`, {
              encoding: "utf-8",
            });
            allResults.push(content);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      console.log(allResults)
      return allResults;
    } catch (error) {
      console.log(error);
    }
    
    return allResults;
  }