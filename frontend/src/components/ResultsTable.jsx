const plans = [
  {
    id: 1,
    name: "Hobby",
    memory: "4 GB RAM",
    cpu: "4 CPUs",
    storage: "128 GB SSD disk",
    price: "$40",
    isCurrent: false,
  },
  {
    id: 2,
    name: "Startup",
    memory: "8 GB RAM",
    cpu: "6 CPUs",
    storage: "256 GB SSD disk",
    price: "$80",
    isCurrent: true,
  },
  // More plans...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ResultsTable({ indexes, results }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
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
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg overflow-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {indexes.map((index) => (
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {index}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((i, result) => (
              <tr key={i}>
                {result.length>0?result.map((j,res) => (
                  <td key={j} className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                    {res}
                  </td>
                )):
                <td  className="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                {result}
              </td>
          }
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
