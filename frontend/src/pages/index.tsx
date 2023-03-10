// import Plot from 'react-plotly.js';
import { DataFrame, fromCSV, Series } from "data-forge";
import dynamic from "next/dynamic";

import { Card } from "@/components/card";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import OneSection from "@/templates/OneSection";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
const Table = (props) => {
  const values = [
    ["Books", "Clothes", "Medicals"],
    [
      "$22",
      "$190",
      '<a href="https://github.com/dream-faster/benchmarking-test">Link to site</a>',
    ],
  ];
  const headers = [["<b> Item </b>"], ["<b> Expenditure </b>"]];
  const data = [
    {
      type: "table",
      header: {
        values: headers,
        align: "center",
        presentation: "markdown",
      },
      cells: {
        values,
        align: "center",
      },
    },
  ];

  return (
    <Plot data={data} layout={{ width: 500, height: 500, title: "Table" }} />
  );
};

export default function Index({ date, close }) {
  // const router = useRouter();

  return (
    <Main
      wide={true}
      meta={
        <Meta
          title="Nowcasting Benchmarks"
          description="Continously Validated models on public Time Series Datasets."
          social_card_ending="landing"
        />
      }
    >
      <OneSection>
        <Card>
          <Table />
        </Card>
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
