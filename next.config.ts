import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

const nextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
