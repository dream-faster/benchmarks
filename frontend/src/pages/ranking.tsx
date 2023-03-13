import { Meta } from "@/layouts/Meta";
import { getSortedTopicsData } from "@/lib/models";
import { Main } from "@/templates/Main";
import OneSection from "@/templates/OneSection";

export default function Index({
  allPostsData,
}: {
  allPostsData: [string, string, string, string];
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
      <OneSection>Models</OneSection>
    </Main>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedTopicsData();
  return {
    props: {
      allPostsData,
    },
  };
}
