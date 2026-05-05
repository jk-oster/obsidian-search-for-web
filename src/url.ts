export function stripUrlParameters(url: string, params: string[]): string {
    if (!params.length) return url;
    try {
        const parsed = new URL(url);
        params.forEach(p => parsed.searchParams.delete(p));
        return parsed.toString();
    } catch {
        return url;
    }
}
