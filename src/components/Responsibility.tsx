import data from "../app/pscf/data/capabilities.json"

interface Capabilities {
    [key: string]: {
        regulations: {name: string, required: string}[],
        accountability: {name: string, accountable: string}[],
        responsibility: {name: string, responsible: string}[]
    }
}

var mappings: Capabilities = data

  export function Responsibility({capability_id}: { capability_id: string }) {
    return (

        <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="my-1 min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                        <tr className="divide-x divide-gray-200 dark:divide-gray-800">
                        {mappings[capability_id]["responsibility"].map((source) => (
                            <th key={source.name} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            {source.name}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                       
                        <tr key="responsibility" className="divide-x divide-gray-200 dark:divide-gray-800">
                            {mappings[capability_id]["responsibility"].map((source) => (
                            <td key={source.name} className="whitespace-nowrap py-4 pl-4 text-sm  text-gray-900 dark:text-white">
                            {source.responsible}
                            </td>
                            ))}
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
  }
  