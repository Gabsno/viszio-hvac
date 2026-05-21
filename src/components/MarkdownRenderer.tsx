import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

// Extract the visible text of a hast/mdast node tree.
function nodeText(node: unknown): string {
  if (!node || typeof node !== 'object') return '';
  const n = node as { value?: string; children?: unknown[] };
  if (typeof n.value === 'string') return n.value;
  if (Array.isArray(n.children)) return n.children.map(nodeText).join('');
  return '';
}

interface Props {
  markdown: string;
}

/**
 * Renders article Markdown. Two blockquote variants get special styling:
 *  - Ghana callouts (text begins with the 🇬🇭 flag)
 *  - Standards purchase-link footers (text begins with "Get the official")
 */
function MarkdownRendererBase({ markdown }: Props) {
  return (
    <div className="article-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
        components={{
          blockquote({ node, children }) {
            const text = nodeText(node).trim();
            let cls = '';
            if (text.startsWith('🇬🇭')) cls = 'ghana-callout';
            else if (/^get the official/i.test(text)) cls = 'standards-footer';
            return <blockquote className={cls}>{children}</blockquote>;
          },
          a({ href, children }) {
            const isExternal = !!href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export const MarkdownRenderer = memo(MarkdownRendererBase);
