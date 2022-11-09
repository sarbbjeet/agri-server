const webpack = require("webpack");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    minimumCacheTTL: 60,
    domains: ["localhost"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/(.*)",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Credentials",
  //           value: "true",
  //         },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
};
module.exports = nextConfig;
