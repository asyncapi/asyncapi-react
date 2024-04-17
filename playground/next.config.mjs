const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix;
let basePath;

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace('asyncapi/', '');
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
  assetPrefix,
  basePath,
};

export default nextConfig;
