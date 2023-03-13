export function ResultsTable({ indexes, results }) {
  return (
    <div className="">
      {/* <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Benchmarks
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Current tests have run on 2023-03-10
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Upload your own model
            </button>
          </div>
      </div> */}
      <div className="ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {indexes.map((index, i) => (
                <th
                key={i}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result,i) => (
              <tr key={i}>
                {result.map((res, j) => (
                  <td key={j} className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                    {res}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
