import data from "../app/pscf/data/regulatory-mappings.json"

interface ComplianceMappings {
    [key: string]: {name: string, required: string}[]
}

var mappings: ComplianceMappings = data

  export function Compliance({capability_id}: { capability_id: string }) {
    return (

        <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="mt-1 min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                        <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                            Regulation or Standard
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Required
                        </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {mappings[capability_id].map((source) => (
                        <tr key={source.name}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-900 dark:text-white sm:pl-0">
                            {source.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-white">{source.required}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
  }
  