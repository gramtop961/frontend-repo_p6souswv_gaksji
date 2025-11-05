import { Store, Key, Link, CheckCircle2, Settings } from 'lucide-react'

const steps = [
  {
    icon: Store,
    title: 'Create a Shopify app',
    desc: 'In your Shopify admin, create a custom app for your store.'
  },
  {
    icon: Key,
    title: 'Generate Admin API token',
    desc: 'Enable Admin API scopes and install the app to get the access token.'
  },
  {
    icon: Link,
    title: 'Connect your store',
    desc: 'Paste your store domain and Admin API token to establish a secure connection.'
  },
  {
    icon: Settings,
    title: 'Enable webhooks',
    desc: 'We guide you to subscribe to orders, products, and customers updates.'
  },
  {
    icon: CheckCircle2,
    title: 'You’re all set',
    desc: 'Data starts flowing into your workspace in real-time.'
  }
]

export default function IntegrationSteps() {
  return (
    <section className="py-12" aria-labelledby="how-it-works">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="how-it-works" className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="rounded-xl border bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{i + 1}. {title}</p>
                  <p className="text-sm text-gray-600 mt-1">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
