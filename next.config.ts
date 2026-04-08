import createMDX from "@next/mdx";

const nextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
