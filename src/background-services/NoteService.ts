import {defineProxyService} from '@webext-core/proxy-service';
import type {AcceptHeader, ContentTypeHeader, LocalRestNoteMatch, NoteMatch, OmniSearchNoteMatch} from "../types.js";

class NoteService {

    // async appendActiveNote(content: string, {apiKey, protocol, obsidianRestUrl, port}:{apiKey: string, protocol: string, obsidianRestUrl: string, port: number, vault: string}) {
    //
    // }

    async fetchJsonQuery(query: Object|string, {apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
    }, contentType: ContentTypeHeader = 'application/vnd.olrapi.jsonlogic+json'): Promise<any[]> {
        const options = {...this.getLocalRestApiOptions(apiKey), method: 'POST', body: typeof query === 'object' ? JSON.stringify(query) : query};
        options.headers['Content-Type'] = contentType;
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/search/';
        const resp = await fetch(url, options);
        return await resp.json();
    }

    async fetchActiveNote({apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        vault: string
    }): Promise<string> {
        const options = this.getLocalRestApiOptions(apiKey);
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/active';
        const resp = await fetch(url, options);
        return await resp.text();

        // const data = await resp.text();
        // console.log(data);
        // return data;
    }

    async fetchNote(fileName: string, {apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        vault: string
    }, accept: AcceptHeader = 'text/markdown'): Promise<string> {
        const options = this.getLocalRestApiOptions(apiKey);
        // @ts-ignore
        options.headers['Accept'] = accept;
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/vault/' + encodeURIComponent(fileName);
        const resp = await fetch(url, options);
        return await resp.text();

        // const data = await resp.text();
        // console.log(data);
        // return data;
    }

    async writeNote(fileName: string, content: string, {apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        vault: string
    }): Promise<void> {
        const options = { ...this.getLocalRestApiOptions(apiKey), method: 'PUT', body: content};
        options.headers['Content-Type'] = 'text/markdown';
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/vault/' + encodeURIComponent(fileName);
        const resp = await fetch(url, options);

        // const data = await resp.json();
        // console.log(data);
        // return data;
    }

    async appendNote(fileName: string, content: string, {apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        vault: string
    }): Promise<void> {
        const options = { ...this.getLocalRestApiOptions(apiKey), method: 'POST', body: content};
        options.headers['Content-Type'] = 'text/markdown';
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/vault/' + encodeURIComponent(fileName);
        const resp = await fetch(url, options);

        // const data = await resp.json();
        // console.log(data);
        // return data;
    }

    async writePeriodicNote(content: string, {apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        vault: string
    }, period: string = 'daily'): Promise<void> {
        const options = { ...this.getLocalRestApiOptions(apiKey), method: 'PUT', body: content};
        options.headers['Content-Type'] = 'text/markdown';
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/periodic/' + period;
        const resp = await fetch(url, options);

        // const data = await resp.json();
        // console.log(data);
        // return data;
    }

    async appendPeriodicNote(content: string, {apiKey, restApiProtocol, restApiPort}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        vault: string
    }, period: string = 'daily'): Promise<void> {
        const options = { ...this.getLocalRestApiOptions(apiKey), method: 'POST', body: content};
        options.headers['Content-Type'] = 'text/markdown';
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/periodic/' + period;
        const resp = await fetch(url, options);

        // const data = await resp.json();
        // console.log(data);
        // return data;
    }

    async fetchPeriodic({apiKey, restApiProtocol, restApiPort}:{apiKey: string, restApiProtocol: string, restApiPort: number}, period: string = 'daily', accept: AcceptHeader = 'text/markdown'): Promise<string> {
        const options = this.getLocalRestApiOptions(apiKey);
        // @ts-ignore
        options.headers['Accept'] = accept;
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/periodic/' + period + '/';
        const resp = await fetch(url, options);
        const data: string = await resp.text();
        return data;
    }

    async fetchMetaData({apiKey, restApiProtocol, restApiPort}:{apiKey: string, restApiProtocol: string, restApiPort: number}): Promise<any> {
        const options = this.getLocalRestApiOptions(apiKey);
        const url = restApiProtocol + '127.0.0.1:' + restApiPort;
        const resp = await fetch(url, options);
        const data: any = await resp.json();
        return data;
    }

    // async fetchCommands({apiKey, protocol, obsidianRestUrl, port}:{apiKey: string, protocol: string, obsidianRestUrl: string, port: number, vault: string})Promise<Command[]> {
    //
    // }
    //
    // async executeCommand(commandId: string, {apiKey, protocol, obsidianRestUrl, port}:{apiKey: string, protocol: string, obsidianRestUrl: string, port: number, vault: string}) {
    //
    // }

    getLocalRestApiOptions(apiKey: string) {
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey,
            }
        };
    }

    async fetchLocalRest(query: string, {apiKey, restApiProtocol, restApiPort, contextLength, matchCount, vault}: {
        apiKey: string,
        restApiProtocol: string,
        restApiPort: number,
        contextLength: number,
        matchCount: number,
        vault: string
    }): Promise<NoteMatch[]> {
        const options = this.getLocalRestApiOptions(apiKey);
        options.method = 'POST';
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/search/simple/?query=' + encodeURIComponent(query) + '&contextLength=' + contextLength;

        const resp = await fetch(url, options);
        const data: LocalRestNoteMatch[] = await resp.json();

        const match = query?.toLowerCase();
        data?.sort((a: any, b: any) => {
            const aIndexMatch = a.filename.toLowerCase().indexOf(match);
            const bIndexMatch = b.filename.toLowerCase().indexOf(match);
            if (aIndexMatch > bIndexMatch) return -1;
            if (aIndexMatch < bIndexMatch) return 1;
            return 0;
        });

        return data.map(note => this.mapLocalRestToNoteMatch(note, {matchCount, vault}))
    }

    async fetchOmniSearch(query: string, {protocol, port, vault, matchCount}: {
        protocol: string,
        port: number,
        vault: string,
        matchCount: number
    }): Promise<NoteMatch[]> {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const url = protocol + 'localhost:' + port + '/search?q=' + query;
        const resp = await fetch(url, options);
        const data: OmniSearchNoteMatch[] = await resp.json();

        return data.map(note => this.mapOmniSearchToNoteMatch(note, {matchCount, vault}));
    }

    mapOmniSearchToNoteMatch(data: OmniSearchNoteMatch, {matchCount, vault}: {
        matchCount: number,
        vault: string
    }): NoteMatch {
        let baseName = data.basename;
        if (baseName.endsWith('.md')) {
            baseName = baseName.replace('.md', '');
        }

        return {
            filename: data.path,
            path: data.path.replaceAll(baseName + '.md', '') ?? '/',
            basename: baseName,
            score: data.score,
            matchesCount: data.matches.length,
            excerpt: matchCount == 0 ? '' : data.excerpt.replaceAll(/<br.?\/?>/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(baseName ? baseName + '.md' : '')
        }
    }

    mapLocalRestToNoteMatch(data: LocalRestNoteMatch, {matchCount, vault}: {
        matchCount: number,
        vault: string
    }): NoteMatch {
        let baseName = data.filename?.split('/')[data.filename?.split('/').length - 1] ?? '';
        if (baseName.endsWith('.md')) {
            baseName = baseName.replace('.md', '');
        }

        return {
            filename: data.filename,
            path: data.filename?.replace(baseName + '.md', ''),
            basename: baseName,
            score: data.score,
            matchesCount: data.matchesCount ?? 1,
            excerpt: data.matches.map((match: any) => match.context).slice(0, matchCount).join(' ... ').replaceAll(/<br.?\/?>|\\n/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(baseName ? baseName + '.md' : '')
        }
    }
}

export const [registerNoteService, getNoteService] = defineProxyService(
    'NoteService',
    () => new NoteService(),
);