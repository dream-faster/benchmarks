import { getAllPostIds, getPostData, getResults } from "@/lib/finder";
import { processResults } from "@/lib/utils";

import { Meta } from "@/layouts/Meta.tsx";
import { Main } from "@/templates/Main.tsx";
import { ProjectPage } from "@/components/ProjectPage";
import path from "path";

export default function Post({ postData, indexes, results, newestModDate }) {
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
      <ProjectPage
        metadata={postData}
        indexes={indexes}
        results={results}
        modDate={newestModDate}
      />
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
  const { indexes, results, newestModDate } = processResults(benchmark_results);
  return {
    props: {
      postData,
      indexes,
      results,
      newestModDate,
    },
  };
}
