import Container from '@/components/Container';
import List from '@/components/List';
import { Meta } from '@/layouts/Meta';
import { getSortedDatasets } from '@/lib/datasets';
import { Main } from '@/templates/Main';


export default function Index({
  allDatasets,
}: {
  allDatasets: [];
}): JSX.Element {
  // const router = useRouter();

  return (
    <Main
      wide={true}
      meta={
        <Meta
          title="Topics >> Nowcasting Eval AI Studio"
          description="Independent R&D studio specialized in Artificial Intelligence and Nowcasting."
          social_card_ending="models"
        />
      }
    >
      <Container title="Datasets">
        <List elements={allDatasets}/>
      </Container>

    </Main>
  );
}

export async function getStaticProps() {
  // const allPostsData = getSortedTopicsData();

  const allDatasets = await getSortedDatasets();
  console.log(allDatasets)
  return {
    props: {
      allDatasets
    },
  };
}
