import { useEffect, useMemo, useState } from 'react'
import { Box, Users, ShoppingCart, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function StoreDataView({ domain }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('products')

  const backendBase = useMemo(() => {
    return (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '')
  }, [])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${backendBase}/shopify/summary?domain=${encodeURIComponent(domain)}`)
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`)
        const json = await res.json()
        if (mounted) setData(json)
      } catch (e) {
        if (mounted) setError(e.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [backendBase, domain])

  return (
    <section className="py-12" aria-labelledby="store-data">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 id="store-data" className="text-2xl font-semibold tracking-tight">
            Store data — {domain}
          </h2>
          {data?.demo ? (
            <div className="inline-flex items-center gap-2 text-xs rounded-full border px-2 py-1 text-gray-600">
              <AlertCircle className="h-3.5 w-3.5" /> Demo data shown
            </div>
          ) : (
            data && (
              <div className="inline-flex items-center gap-2 text-xs rounded-full border px-2 py-1 text-green-700 bg-green-50 border-green-200">
                <CheckCircle2 className="h-3.5 w-3.5" /> Live data
              </div>
            )
          )}
        </div>

        <div className="rounded-2xl border bg-white p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setTab('products')} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${tab==='products' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
              <Box className="h-4 w-4" /> Products ({data?.counts?.products ?? 0})
            </button>
            <button onClick={() => setTab('orders')} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${tab==='orders' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
              <ShoppingCart className="h-4 w-4" /> Orders ({data?.counts?.orders ?? 0})
            </button>
            <button onClick={() => setTab('customers')} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${tab==='customers' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
              <Users className="h-4 w-4" /> Customers ({data?.counts?.customers ?? 0})
            </button>
          </div>

          {loading && (
            <div className="py-16 text-center text-gray-600">
              <Loader2 className="h-5 w-5 inline mr-2 animate-spin" /> Loading data...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              Failed to load data: {error}
            </div>
          )}

          {!loading && !error && data && (
            <div>
              {tab === 'products' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.products.map((p) => (
                    <div key={p.id} className="rounded-xl border p-4">
                      <p className="font-medium truncate" title={p.title}>{p.title}</p>
                      <p className="text-xs text-gray-500 mt-1">Vendor: {p.vendor || '—'}</p>
                      <p className="text-xs text-gray-500">Status: {p.status || p.product_status || '—'}</p>
                    </div>
                  ))}
                  {data.products.length === 0 && <p className="text-sm text-gray-500">No products found.</p>}
                </div>
              )}
              {tab === 'orders' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.orders.map((o) => (
                    <div key={o.id} className="rounded-xl border p-4">
                      <p className="font-medium">{o.name || `Order ${o.id}`}</p>
                      <p className="text-xs text-gray-500">Status: {o.financial_status || '—'}</p>
                      <p className="text-xs text-gray-500">Total: {o.total_price ? `$${o.total_price}` : '—'}</p>
                    </div>
                  ))}
                  {data.orders.length === 0 && <p className="text-sm text-gray-500">No orders found.</p>}
                </div>
              )}
              {tab === 'customers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.customers.map((c) => (
                    <div key={c.id} className="rounded-xl border p-4">
                      <p className="font-medium">{[c.first_name, c.last_name].filter(Boolean).join(' ') || c.email || `Customer ${c.id}`}</p>
                      <p className="text-xs text-gray-500">{c.email || '—'}</p>
                    </div>
                  ))}
                  {data.customers.length === 0 && <p className="text-sm text-gray-500">No customers found.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
