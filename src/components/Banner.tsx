import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';

export function Banner() {
    const [isVisible, setIsVisible] = useState(true);

    function close() {
        setIsVisible(false);
      }

  return (
    <div>
        {isVisible &&
        <div className="flex items-center gap-x-6 bg-sky-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <p className="text-sm leading-6 text-white">
                <a href="/capabilities">
                <strong className="font-semibold">Just Added!</strong>
                <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                    <circle cx={1} cy={1} r={1} />
                </svg>
                Browse all the PSCF's regulation and standards mappings&nbsp;<span aria-hidden="true">&rarr;</span>
                </a>
            </p>
            <div className="flex flex-1 justify-end">
                <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={close}>
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </button>
            </div>
        </div>
        }      
    </div>
  )
}
