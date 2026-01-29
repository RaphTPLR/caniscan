import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';

function estimateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
}

export const Resource = defineDocumentType(() => ({
    name: 'Resource',
    filePathPattern: 'ressources/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        authors: { type: 'list', of: { type: 'string' }, required: false },
        tags: { type: 'list', of: { type: 'string' }, required: false },
        cover: { type: 'string', required: false },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath.replace(/^ressources\//, ''),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/ressources/${doc._raw.flattenedPath.replace(/^ressources\//, '')}`,
        },
        readingTime: {
            type: 'string',
            resolve: (doc) => estimateReadingTime(doc.body.raw),
        },
    },
}));

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Resource],
    mdx: {
        remarkPlugins: [remarkGfm, remarkDirective],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['anchor'] } }],
        ],
    },
    disableImportAliasWarning: true,
});


