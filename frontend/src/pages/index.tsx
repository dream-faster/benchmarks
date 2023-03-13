import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { DataFrame, fromCSV, Series } from 'data-forge';
import Landing from '@/components/Landing';
import { getAllPostIds, getPostData, getResults } from '@/lib/datasets';

export default function Index({results, indexes}) {
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
    <Landing results={results} indexes={indexes}/>
    </Main>
  );
}


export async function getStaticProps({ params }) {
  const benchmark_results = await getAllResults(params.id)
  
  const results = benchmark_results.map(result=>{
    const df = fromCSV(result);
    const results = df.getSeries(df.getColumnNames()[1]).toArray();

    return results
  })
  const df = fromCSV(benchmark_results[0]);
  const indexes = df.getSeries(df.getColumnNames()[0]).toArray();

  return {
    props: {
      postData,
      indexes,
      results,
    },
  };
}

