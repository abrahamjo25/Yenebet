/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@fullcalendar/common', '@fullcalendar/react', '@fullcalendar/timegrid', '@fullcalendar/daygrid']);
const nextConfig = withTM({
    reactStrictMode: false,
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '' : '',
        uploadPath: process.env.NODE_ENV === 'production' ? '/api/upload' : '/api/upload'
    },
    env: {
        API_SERVICE_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        API_SERVICE_CLIENT_ID:process.env.NEXT_PUBLIC_API_SERVICE_CLIENT_ID,
        API_SERVICE_CLIENT_SECRECT:process.env.NEXT_PUBLIC_API_SERVICE_CLIENT_SECRECT
      }
    
});

module.exports = nextConfig;
