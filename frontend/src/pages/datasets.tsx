import { DataFrame, fromCSV, Series } from "data-forge";
import dynamic from "next/dynamic";

import { Card } from "@/components/card";
import { Meta } from "@/layouts/Meta";
import { getSortedPostsData } from "@/lib/datasets";
import { Main } from "@/templates/Main";
import OneSection from "@/templates/OneSection";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
export default function Index({
  date,
  close,
}: {
  date: Array<number>;
  close: Array<number>;
}): JSX.Element {
  // const router = useRouter();

  return (
    <Main
      wide={true}
      meta={
        <Meta
          title="Projects >> Nowcasting Eval AI Studio"
          description="Independent R&D studio specialized in Artificial Intelligence and Nowcasting."
          social_card_ending="datasets"
        />
      }
    >
      <OneSection>
        {/* <h1>{allPostsData}</h1> */}
        {/* <Card> */}
        <Plot
          data={[
            {
              x: date,
              y: close,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{ title: "Bitcoin" }}
        />
        {/* </Card> */}
        {/* <ProjectsSection allPostsData={allPostsData} baseUrl="datasets" all /> */}
      </OneSection>
    </Main>
  );
}

function fetchCsv() {
  return fetch(
    "https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/bitcoin.csv"
  ).then(function (response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    return reader.read().then(function (result) {
      return decoder.decode(result.value);
    });
  });
}

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  // const allTopicsData = getSortedTopicsData();

  // const res = await fetch(
  //   'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/model.csv'
  // );
  // const resultsData = await res.json();
  // const bitcoin = await fetch(
  //   'https://raw.githubusercontent.com/dream-faster/benchmarking-test/master/results/bitcoin.csv'
  // );
  const bitcoinData = await fetchCsv();

  // raw.githubusercontent.com/Unsigned-Research/enoki-research/main/results.csv?token=GHSAT0AAAAAAB65Q4QLH63AHK64XZSFPI2CY77HANA

  // const allTopicsData = allPostsData;

  const df = fromCSV(bitcoinData);
  const close = df.getSeries("Close").toArray();
  const date = df.getSeries("Date").toArray();

  return {
    props: {
      date,
      close,
    },
  };
}
