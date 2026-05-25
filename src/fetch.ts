export async function fetchWithTimeout(url: string, options?: RequestInit, timeoutMs = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, {...options, signal: controller.signal});
    } finally {
        clearTimeout(timeoutId);
    }
}
