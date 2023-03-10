import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import {Nav} from '@/layouts/nav'

export default function Example(props) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        {/* <header> */}
          <Nav/>
        {/* </header> */}

        {/* <main className="-mt-32"> */}
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">{props.children}</div>
        {/* </main> */}
      </div>
    </>
  )
}