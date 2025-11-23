// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }




import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware((auth, req) => {
  const publicRoutes = [
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/collections(.*)',
    '/api/products(.*)',
    '/api/search(.*)',
    '/api/orders/customers(.*)',
    '/api/checkout',
    '/api/webhooks(.*)',
  ]

  const url = req.nextUrl.pathname

  if (publicRoutes.some((route) => new RegExp(`^${route}$`).test(url))) {
    return
  }

  auth().protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
