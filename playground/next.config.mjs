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
  

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        util: false,
        buffer: false,
        stream: false,
        crypto: false,
        net: false,
        tls: false,
        zlib: false,
        http: false,
        https: false,
        os: false,
        constants: false
      };
    }
    return config;
  },
  
 
  transpilePackages: [
    '@asyncapi/parser',
    '@asyncapi/avro-schema-parser',
    '@stoplight/spectral-core',
    '@stoplight/spectral-ref-resolver',
    '@stoplight/json-ref-readers',
    'avsc'
  ],
  
  assetPrefix,
  basePath,
};

export default nextConfig;
