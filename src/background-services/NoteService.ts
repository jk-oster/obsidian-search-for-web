import {defineProxyService} from '@webext-core/proxy-service';
import type {LocalRestNoteMatch, NoteMatch, OmniSearchNoteMatch} from "../types.js";

class NoteService {

    // async appendActiveNote(content: string, {apiKey, protocol, obsidianRestUrl, port}:{apiKey: string, protocol: string, obsidianRestUrl: string, port: number, vault: string}) {
    //
    // }

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
    }): Promise<string> {
        const options = this.getLocalRestApiOptions(apiKey);
        const url = restApiProtocol + '127.0.0.1:' + restApiPort + '/vault/' + encodeURIComponent(fileName);

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
            excerpt: data.matches.map((match: any) => match.context).slice(0, matchCount).join(' ... ').replaceAll(/<br.?\/?>/g, ' '),
            url: 'obsidian://open?vault=' + encodeURIComponent(vault ?? '') + '&file=' + encodeURIComponent(baseName ? baseName + '.md' : '')
        }
    }
}

export const [registerNoteService, getNoteService] = defineProxyService(
    'NoteService',
    () => new NoteService(),
);