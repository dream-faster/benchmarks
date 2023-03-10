import { getAllPostIds, getPostData } from '@/lib/datasets';

import { Meta } from '@/layouts/Meta.tsx';
import { Main } from '@/templates/Main.tsx';
import { getSortedTopicsData } from '@/lib/models';

export default function Post({ postData, filteredTopics }) {
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
  const topicData = await getSortedTopicsData();

  const filteredTopics = topicData.filter((topic) =>
    postData.tag.split(',').includes(topic.tag.split(',')[0])
  );

  return {
    props: {
      postData,
      filteredTopics,
    },
  };
}
