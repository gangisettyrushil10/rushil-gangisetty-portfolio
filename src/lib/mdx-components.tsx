import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-12 text-3xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 text-2xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-8 text-[rgb(var(--muted-ink))]" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[rgb(var(--accent-strong))] underline decoration-[rgb(var(--accent-soft))] underline-offset-4"
      {...props}
    />
  ),
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[rgb(var(--muted-ink))]" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[rgb(var(--muted-ink))]" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-[rgb(var(--accent-soft))] pl-5 text-lg italic text-[rgb(var(--ink))]"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-md bg-[rgb(var(--surface-muted))] px-1.5 py-0.5 font-mono text-sm text-[rgb(var(--ink))]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-3xl border border-[rgb(var(--line))] bg-[rgb(var(--surface-strong))] p-5 text-sm text-[rgb(var(--surface))]"
      {...props}
    />
  ),
};
