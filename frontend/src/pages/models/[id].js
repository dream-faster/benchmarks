import { getSortedPostsData } from '@/lib/datasets';

import { Meta } from '@/layouts/Meta.tsx';
import { Main } from '@/templates/Main.tsx';
import { getAllTopicIds, getTopicData } from '@/lib/models';

export default function Post({ topicData, filteredProjects }) {
  return (
    <Main
      wide={true}
      meta={
        <Meta
          title={`Project: ${topicData.title} - Nowcasting Eval | ML Research`}
          description={topicData.description}
          social_card_ending="models"
        />
      }
    >
      {/* <ProjectPage
        data={topicData}
        relatedData={filteredProjects}
        relatedType="datasets"
      /> */}
    </Main>
  );
}

export async function getStaticPaths() {
  const paths = getAllTopicIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const topicData = await getTopicData(params.id);
  const postData = await getSortedPostsData();

  const topicTags = topicData.tag.split(',');

  const filteredProjects = postData.filter((project) =>
    project.tag.split(',').includes(topicTags[0])
  );

  return {
    props: {
      topicData,
      filteredProjects,
    },
  };
}
