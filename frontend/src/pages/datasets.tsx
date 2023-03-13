import Container from '@/components/Container';
import List from '@/components/List';
import { Meta } from '@/layouts/Meta';
import { getSortedDatasetsOrModels } from '@/lib/finder';
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
        <List elements={allDatasets} baseUrl="datasets"/>
      </Container>

    </Main>
  );
}

export async function getStaticProps() {
  const allDatasets = await getSortedDatasetsOrModels(1);
  return {
    props: {
      allDatasets
    },
  };
}
