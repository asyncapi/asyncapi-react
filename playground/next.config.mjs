const isGithubActions = process.env.GITHUB_ACTIONS ?? false;

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
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = {
      fs: false,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  assetPrefix,
  basePath,
};

export default nextConfig;
