import { DataFrame, fromCSV, Series } from "data-forge";

export function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}


export function processResults(benchmark_results){

    let newestModDate;
    const results = benchmark_results.map((result, i) => {
    const df = fromCSV(result);
    const results = df.getSeries(df.getColumnNames()[1]).toArray();
    let resultDate = results[2]

    if (i===0){
        newestModDate = resultDate
    }
    if (Date.parse(newestModDate) < Date.parse(resultDate)) {
        newestModDate = resultDate;
    }

    return results;
    });
    const df = fromCSV(benchmark_results[0]);
    const indexes = df.getSeries(df.getColumnNames()[0]).toArray();

    return {indexes, results, newestModDate}
}