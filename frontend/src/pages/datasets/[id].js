import { getAllPostIds, getPostData, getResults } from '@/lib/datasets';

import { Meta } from '@/layouts/Meta.tsx';
import { Main } from '@/templates/Main.tsx';
import { getSortedTopicsData } from '@/lib/models';
import { ProjectPage } from '@/components/ProjectPage';
import { DataFrame, fromCSV, Series } from 'data-forge';

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
    <ProjectPage metadata={postData} indexes={indexes} results={results}/>
    </Main>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  // const topicData = await getSortedTopicsData();
  const benchmark_results = await getResults(params.id)
  
  const results = benchmark_results.map(result=>{
    const df = fromCSV(result);
    const results = df.getSeries(df.getColumnNames()[1]).toArray();

    return results
  })
  const df = fromCSV(benchmark_results[0]);
  const indexes = df.getSeries(df.getColumnNames()[0]).toArray();


  // console.log(indexes)
  console.log(results)
  // const filteredTopics = topicData.filter((topic) =>
  //   postData.tag.split(',').includes(topic.tag.split(',')[0])
  // );

  return {
    props: {
      postData,
      indexes,
      results,
    },
  };
}
