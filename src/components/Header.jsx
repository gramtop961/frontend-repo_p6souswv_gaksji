import { Store, Shield } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full py-6">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center text-white">
            <Store className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight">ShopSync</p>
            <p className="text-xs text-gray-500 -mt-1">Connect your Shopify store in minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="hidden md:flex items-center gap-2 text-gray-500">
            <Shield className="h-4 w-4" />
            <span>Secure by design</span>
          </div>
          <a
            href="#connect"
            className="inline-flex items-center rounded-lg bg-gray-900 text-white px-4 py-2 hover:bg-black transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  )
}
