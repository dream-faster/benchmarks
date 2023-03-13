const fs = require("fs");
import path from "path";
import { onlyUnique } from "@/lib/utils";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function readDir(
  id: string | null,
  dirname: string,
  type_index: number | null
): Array<string> {
  const allResults = [];
  const files = await fs.promises.readdir(dirname);

  try {
    for (const fileName of files) {
      try {
        if (type_index == null) {
          const content = await fs.promises.readFile(`${dirname}/${fileName}`, {
            encoding: "utf-8",
          });
          allResults.push(content);
        } else {
          const dataset_name: string = fileName
            .split(" - ")
            [type_index].replace(".csv", "");
          if (id === null) {
            allResults.push(dataset_name);
          } else if (id === dataset_name) {
            const content = await fs.promises.readFile(
              `${dirname}/${fileName}`,
              {
                encoding: "utf-8",
              }
            );
            allResults.push(content);
          }
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

export async function getAllResults() {
  let all_results = await readDir(null, resultsDirectory, null);
  all_results.sort();
  all_results = all_results.filter(onlyUnique);

  return all_results;
}



export function getSortedPostsData(directory:string) {
  const dirNames = fs.readdirSync(directory);

  const allPostsData = dirNames.map(directory=>directory.map((fileName) => {
    if (fileName.split('.')[-1] === '.md'){ 
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    console.log(id)
    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  }
    else return null
  }));

  const filteredPostData = allPostsData.filter(Boolean)

  // Sort posts by date
  return filteredPostData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}


export async function getPostData(directory:string, id:string) {
  const fullPath = path.join(directory, `${id}/description.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getAllPostIds(directory:string) {
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getResults(type:number, id:string) {
  const resultsDirectory = path.join(process.cwd(), "results");
  const results = await readDir(id, resultsDirectory, type);
  return results;
}
