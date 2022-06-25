// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

module.exports = {
  serverRuntimeConfig: {
    secret: "A7P2I9C2U3B5E1S",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "http://localhost:3000/api",
  },
};
