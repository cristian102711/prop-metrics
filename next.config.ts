import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: false,
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/portfolio',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/portfolio',
  },
}

export default nextConfig