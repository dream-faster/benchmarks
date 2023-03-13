import { getAllPostIds, getPostData, getResults } from "@/lib/finder";

import { Meta } from "@/layouts/Meta.tsx";
import { Main } from "@/templates/Main.tsx";
import { ProjectPage } from "@/components/ProjectPage";
import { DataFrame, fromCSV, Series } from "data-forge";
import path from "path";

export default function Post({ postData, indexes, results }) {
  return (
    <Main
      wide={true}
      meta={
        <Meta
          title={`Project: ${postData.title} - Nowcasting Eval | ML Research`}
          description={postData.description}
          social_card_ending="datasets"
        />
      }
    >
      <ProjectPage metadata={postData} indexes={indexes} results={results} />
    </Main>
  );
}

const modelDirectory = path.join(process.cwd(), "src/models");

export async function getStaticPaths() {
  const paths = getAllPostIds(modelDirectory);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(modelDirectory, params.id);
  const benchmark_results = await getResults(0, params.id);

  const results = benchmark_results.map((result) => {
    const df = fromCSV(result);
    const results = df.getSeries(df.getColumnNames()[1]).toArray();

    return results;
  });

  const df = fromCSV(benchmark_results[0]);
  const indexes = df.getSeries(df.getColumnNames()[0]).toArray();
  
  return {
    props: {
      postData,
      indexes,
      results,
    },
  };
}
