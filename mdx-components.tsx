import type { MDXComponents } from "mdx/types";

function Code(props: React.HTMLAttributes<HTMLElement>) {
  return <code {...props} />;
}

function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="code-window my-6">
      <div className="code-window__header">
        <span className="code-window__dot code-window__dot--red" />
        <span className="code-window__dot code-window__dot--yellow" />
        <span className="code-window__dot code-window__dot--green" />
      </div>
      <pre {...props} />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: React.HTMLAttributes<HTMLElement>) => (
      <>
        <h1
          {...props}
          className="mb-6 text-4xl font-bold tracking-tight border-b border-white/10"
        />
      </>
    ),
    h2: (props: React.HTMLAttributes<HTMLElement>) => (
      <h2
        {...props}
        className="mb-2 mt-10 text-2xl font-semibold border-b border-white/10 pb-3"
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLElement>) => (
      <h3 {...props} className="mb-3 mt-3 text-xl font-semibold" />
    ),
    p: (props: React.HTMLAttributes<HTMLElement>) => (
      <p {...props} className="mb-4 leading-7 " />
    ),
    ul: (props: React.HTMLAttributes<HTMLElement>) => (
      <ul {...props} className="mb-4 list-disc space-y-2 pl-6 " />
    ),
    ol: (props: React.HTMLAttributes<HTMLElement>) => (
      <ol {...props} className="mb-4 list-decimal space-y-2 pl-6 " />
    ),
    a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        {...props}
        className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
      />
    ),
    code: Code,
    pre: Pre,
    ...components,
  };
}
