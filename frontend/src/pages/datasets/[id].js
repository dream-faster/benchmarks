import { getAllPostIds, getPostData, getResults } from '@/lib/datasets';

import { Meta } from '@/layouts/Meta.tsx';
import { Main } from '@/templates/Main.tsx';
import { getSortedTopicsData } from '@/lib/models';
import { ProjectPage } from '@/components/ProjectPage';
import { DataFrame, fromCSV, Series } from 'data-forge';

export default function Post({ postData, results }) {
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
    <ProjectPage metadata={postData} results={results}/>
    {/* <article className="prose prose-zinc w-full dark:prose-invert ">
        <h3> {postData.description} </h3>
        <div
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          className="dark:text-slate-100"
        />
      </article>
      <div>
        {results}
      </div> */}
      {/* <ProjectPage
        data={postData}
        relatedData={filteredTopics}
        relatedType="models"
      /> */}
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

// export async function getStaticProps({ params }) {
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// }

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  // const topicData = await getSortedTopicsData();
  const results = await getResults(params.id)
  
  const df = fromCSV(results[0]);
  df.getColumnNames()[0]
  const result = df.getSeries(df.getColumnNames()[0]).toArray();
  const date = df.getSeries('Date').toArray();
  // const filteredTopics = topicData.filter((topic) =>
  //   postData.tag.split(',').includes(topic.tag.split(',')[0])
  // );

  return {
    props: {
      postData,
      results,
    },
  };
}
