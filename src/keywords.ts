export interface FrontmatterFilter {
    key: string;
    value: string;
}

export interface ParsedQuery {
    text: string;
    paths: string[];
    tags: string[];
    frontmatter: FrontmatterFilter[];
}

export function parseSearchKeywords(query: string): ParsedQuery {
    const paths: string[] = [];
    const tags: string[] = [];
    const frontmatter: FrontmatterFilter[] = [];
    let text = query;

    // fm:key:value — frontmatter exact match
    const fmRegex = /\bfm:(\w+):(\S+)/gi;
    let match;
    while ((match = fmRegex.exec(query)) !== null) {
        frontmatter.push({ key: match[1], value: match[2] });
        text = text.replace(match[0], '');
    }

    // path:segment and tag:/tags:name
    const prefixRegex = /\b(path|tags?):(\S+)/gi;
    while ((match = prefixRegex.exec(query)) !== null) {
        const prefix = match[1].toLowerCase().replace(/s$/, '');
        const value = match[2];
        if (prefix === 'path') {
            paths.push(value);
        } else {
            tags.push(value.startsWith('#') ? value.slice(1) : value);
        }
        text = text.replace(match[0], '');
    }

    return { text: text.trim(), paths, tags, frontmatter };
}

export function hasKeywords(parsed: ParsedQuery): boolean {
    return parsed.paths.length > 0 || parsed.tags.length > 0 || parsed.frontmatter.length > 0;
}
