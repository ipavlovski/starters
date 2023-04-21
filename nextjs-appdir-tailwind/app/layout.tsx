import '@/styles/globals.css'
import React from 'react'
// import AddressBar from '@/ui/AddressBar';
// import GlobalNav from './GlobalNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Turbopack Tester</title>
      </head>
      <body className="overflow-y-scroll bg-zinc-900">
        <div className="grid grid-cols-[1fr,minmax(auto,240px),min(800px,100%),1fr] gap-x-8 py-8">
          <div className="col-start-2 text-white">
            {/* <GlobalNav /> */}
            <h3>global nav goes here</h3>
          </div>

          <div className="col-start-3 space-y-6 text-white">
            {/* <AddressBar /> */}
            <h3>Address bar goes here</h3>

            <div className="rounded-xl border border-zinc-800 bg-black p-8">
              {children}
            </div>
          </div>

          <div className="col-start-3 col-end-4 mt-28 flex items-center justify-center">
            <div className="text-sm text-zinc-600">
              <p>Test run for some stuff...</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
