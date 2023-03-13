import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function List({ elements, baseUrl }:{elements:[], baseUrl:string}) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {elements.map((element, i) => (
          <li key={i}>
            <Link href={`/${baseUrl}/` + element}>
              <a className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    {/* <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full" src={application.applicant.imageUrl} alt="" />
                  </div> */}
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {element}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <EnvelopeIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            {"element@gmail.com"}
                          </span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            Applied on{" "}
                            <time dateTime={"12/03/2023"}>{"12/03/2023"}</time>
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            {"benchmarked on 5 models"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
