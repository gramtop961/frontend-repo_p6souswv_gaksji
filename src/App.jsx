import { useState } from 'react'
import Header from './components/Header'
import FeaturesGrid from './components/FeaturesGrid'
import IntegrationSteps from './components/IntegrationSteps'
import ConnectShopify from './components/ConnectShopify'

function App() {
  const [connectedStore, setConnectedStore] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/60 to-white">
      <Header />

      <main>
        <section className="pt-6 pb-10">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Integrate your Shopify stores with ease
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Connect, sync, and manage all your Shopify data in one secure workspace. No code required.
              </p>
              {connectedStore ? (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Connected: {connectedStore.domain}
                </div>
              ) : (
                <div className="mt-5 flex items-center gap-3 text-sm text-gray-600">
                  <div className="h-6 w-6 rounded-full bg-white grid place-items-center border">
                    <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                  </div>
                  Ready when you are — connect a store below.
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/40 to-violet-200/40 blur-2xl rounded-3xl" aria-hidden="true"></div>
              <div className="relative rounded-2xl border bg-white shadow-sm p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"></span>
                    Single place to manage products, orders, and customers
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"></span>
                    Real-time updates via webhooks — no manual refresh
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600"></span>
                    Enterprise-grade security with encrypted tokens
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ConnectShopify onConnected={setConnectedStore} />
        <IntegrationSteps />
        <FeaturesGrid />
      </main>

      <footer className="py-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopSync — Built for Shopify merchants
        </div>
      </footer>
    </div>
  )
}

export default App
