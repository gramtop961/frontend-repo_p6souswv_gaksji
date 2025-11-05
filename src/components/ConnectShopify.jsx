import { useMemo, useState } from 'react'
import { CheckCircle2, Globe, Key, Link, Loader2 } from 'lucide-react'

export default function ConnectShopify({ onConnected }) {
  const [domain, setDomain] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [connectedAt, setConnectedAt] = useState(null)

  const backendBase = useMemo(() => {
    return (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '')
  }, [])

  const webhookUrl = `${backendBase}/shopify/webhook`

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!domain.trim() || !token.trim()) return
    setLoading(true)

    // Simulate an API call — in a real flow we would call our backend here
    await new Promise((r) => setTimeout(r, 900))

    setConnectedAt(new Date())
    setLoading(false)
    onConnected?.({ domain: formatDomain(domain), tokenMasked: maskToken(token) })
  }

  const formatDomain = (value) => {
    const v = value.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')
    return v.endsWith('.myshopify.com') ? v : `${v}.myshopify.com`
  }

  const maskToken = (t) => `${t.slice(0, 4)}••••${t.slice(-4)}`

  return (
    <section id="connect" className="py-12" aria-labelledby="connect-shopify">
      <div className="max-w-3xl mx-auto px-4">
        <div className="rounded-2xl border bg-white p-6 md:p-8">
          <div className="mb-6">
            <h2 id="connect-shopify" className="text-2xl md:text-3xl font-semibold tracking-tight">Connect your Shopify store</h2>
            <p className="text-gray-600 mt-1">Enter your store domain and Admin API access token to begin the integration.</p>
          </div>

          {connectedAt ? (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <p>
                Store connected successfully · <span className="font-medium">{formatDomain(domain)}</span>
              </p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Globe className="h-4 w-4" /> Store domain
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="your-store.myshopify.com"
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Use the full domain, for example: acme.myshopify.com</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Key className="h-4 w-4" /> Admin API access token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="shpat_..."
                className="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Found in Shopify Admin → Apps → Develop apps → API credentials.</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between rounded-lg bg-gray-50 p-3 border">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Link className="h-4 w-4" />
                <span>Webhook listener URL</span>
              </div>
              <code className="text-xs bg-white border rounded-md px-2 py-1 overflow-x-auto">
                {webhookUrl}
              </code>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Connecting...
                  </>
                ) : (
                  'Connect store'
                )}
              </button>

              {token && (
                <span className="text-xs text-gray-500">Token preview: {maskToken(token)}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
