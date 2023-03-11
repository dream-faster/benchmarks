// import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic';

import { Card } from '@/components/card';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import OneSection from '@/templates/OneSection';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
const Table = (props) => {
  const values = [
    ['Books', 'Clothes', 'Medicals'],
    [
      '$22',
      '$190',
      '<a href="https://github.com/dream-faster/benchmarking-test">Link to site</a>',
    ],
  ];
  const headers = [['<b> Item </b>'], ['<b> Expenditure </b>']];
  const data = [
    {
      type: 'table',
      header: {
        values: headers,
        align: 'center',
        presentation: 'markdown',
      },
      cells: {
        values,
        align: 'center',
      },
    },
  ];

  return (
    <Plot data={data} layout={{ width: 500, height: 500, title: 'Table' }} />
  );
};

export default function Index() {
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
