import { Zap, Shield, Settings, Store, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Store,
    title: 'Unified storefronts',
    desc: 'Connect multiple Shopify stores and manage them from a single dashboard.'
  },
  {
    icon: Settings,
    title: 'Automated sync',
    desc: 'Keep products, customers, and orders in sync with smart background jobs.'
  },
  {
    icon: Shield,
    title: 'Secure by default',
    desc: 'Tokens are encrypted at rest with rotating keys and zero knowledge access.'
  },
  {
    icon: Zap,
    title: 'Real-time webhooks',
    desc: 'Instant updates the moment orders or inventory change in your store.'
  },
  {
    icon: BarChart3,
    title: 'Actionable insights',
    desc: 'Built-in analytics so you can make decisions with confidence.'
  },
]

export default function FeaturesGrid() {
  return (
    <section className="py-12" aria-labelledby="features">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="features" className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Why teams choose ShopSync</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border bg-white p-5">
              <div className="h-10 w-10 rounded-lg bg-violet-50 text-violet-600 grid place-items-center">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-semibold">{title}</p>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
