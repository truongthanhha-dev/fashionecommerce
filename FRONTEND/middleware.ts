import { clerkMiddleware } from '@clerk/nextjs/server'

// Cho phép các route dùng cho khách truy cập (home, sản phẩm, dữ liệu API) public.
const publicRoutes = [
  '/',
  '/products(.*)',
  '/collections(.*)',
  '/search(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/collections(.*)',
  '/api/products(.*)',
  '/api/search(.*)',
  '/api/orders/customers(.*)',
  '/api/checkout',
  '/api/webhooks(.*)',
]

export default clerkMiddleware({
  publicRoutes,
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

