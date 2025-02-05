import {defineProxyService} from '@webext-core/proxy-service';
import type {LocalRestNoteMatch, Note, NoteMatch, OmniSearchNoteMatch} from "../types.js";

class NoteService {

    // async appendActiveNote(content: string, {apiKey, protocol, obsidianRestUrl, port}:{apiKey: string, protocol: string, obsidianRestUrl: string, port: number, vault: string}) {
    //
    // }

    async fetchActiveNote({apiKey, protocol, obsidianRestUrl, port}: {
        apiKey: string,
        protocol: string,
        obsidianRestUrl: string,
        port: number,
        vault: string
    }): Promise<string> {
        const options = this.getLocalRestApiOptions(apiKey);
        const url = protocol + obsidianRestUrl + ':' + port + '/active';
        const resp = await fetch(url, options);
        return await resp.text();

        // const data = await resp.text();
        // console.log(data);
        // return data;
    }

    async fetchNote(fileName: string, {apiKey, protocol, obsidianRestUrl, port}: {
        apiKey: string,
        protocol: string,
        obsidianRestUrl: string,
        port: number,
        vault: string
    }): Promise<string> {
        const options = this.getLocalRestApiOptions(apiKey);
        const url = protocol + obsidianRestUrl + ':' + port + '/vault/' + encodeURIComponent(fileName);

        console.log(url);

        const resp = await fetch(url, options);
        return await resp.text();

        // const data = await resp.text();
        // console.log(data);
        // return data;
    }

    // async fetchPeriodic({apiKey, protocol, obsidianRestUrl, port}:{apiKey: string, protocol: string, obsidianRestUrl: string, port: number, vault: string}): Promise<Note> {
    //
    // }

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
                Authorization:
                    'Bearer ' + apiKey,
            }
        };
    }

    async fetchLocalRest(query: string, {apiKey, protocol, obsidianRestUrl, port, contextLength, matchCount, vault}: {
        apiKey: string,
        protocol: string,
        obsidianRestUrl: string,
        port: number,
        contextLength: number,
        matchCount: number,
        vault: string
    }): Promise<NoteMatch[]> {
        const options = this.getLocalRestApiOptions(apiKey);
        options.method = 'POST';
        const url = protocol + obsidianRestUrl + ':' + port + '/search/simple/?query=' + encodeURIComponent(query) + '&contextLength=' + contextLength;

        console.log('searchUrl', url);

        const resp = await fetch(url, options);
        const data: LocalRestNoteMatch[] = await resp.json();

        console.log('searchResults', data);

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

    async fetchOmniSearch(query: string, {protocol, obsidianRestUrl, port, vault, matchCount}: {
        protocol: string,
        obsidianRestUrl: string,
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

        const url = protocol + obsidianRestUrl + ':' + port + '/search?q=' + query;
        const resp = await fetch(url, options);
        const data: OmniSearchNoteMatch[] = await resp.json();

        return data.map(note => this.mapOmniSearchToNoteMatch(note, {matchCount, vault}));
    }

    mapOmniSearchToNoteMatch(data: OmniSearchNoteMatch, {matchCount, vault}: {
        matchCount: number,
        vault: string
    }): NoteMatch {
        return {
            filename: data.path,
            path: data.path.replaceAll(data.basename + '.md', '') ?? '/',
            basename: data.basename,
            score: data.score,
            matchesCount: data.matches.length,
            excerpt: matchCount == 0 ? '' : data.excerpt.replaceAll(/<br.?\/?>/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(data.basename ?? '')
        }
    }

    mapLocalRestToNoteMatch(data: LocalRestNoteMatch, {matchCount, vault}: {
        matchCount: number,
        vault: string
    }): NoteMatch {
        const baseName = data.filename?.split('/')[data.filename?.split('/').length - 1] ?? '';
        return {
            filename: data.filename,
            path: data.filename?.replace(baseName, ''),
            basename: baseName,
            score: data.score,
            matchesCount: data.matchesCount ?? 1,
            excerpt: data.matches.map((match: any) => match.context).slice(0, matchCount).join(' ... ').replaceAll(/<br.?\/?>/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(baseName ?? '')
        }
    }
}

export const [registerNoteService, getNoteService] = defineProxyService(
    'NoteService',
    () => new NoteService(),
);