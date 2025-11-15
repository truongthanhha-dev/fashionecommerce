// Cho phép tối ưu hóa hình ảnh từ Cloudinary
// https://nextjs.org/docs/pages/api-reference/components/image -> remotePatterns

/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
      remotePatterns: [
        {
         
          hostname: 'res.cloudinary.com',
        },
      ],
    },
};

export default nextConfig;
