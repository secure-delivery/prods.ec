import withMarkdoc from '@markdoc/next.js'
import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  // The v1 "Risk Management" area became "Governance, Risk and Compliance" in v2.
  async redirects() {
    return [
      {
        source: '/pscf/capability-areas/risk-management',
        destination: '/pscf/capability-areas/governance-risk-and-compliance',
        permanent: true,
      },
    ]
  },
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)
