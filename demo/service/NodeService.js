import getConfig from 'next/config';

export class NodeService {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getFiles() {
        return fetch(this.contextPath + '/demo/data/files.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getLazyFiles() {
        return fetch(this.contextPath + '/demo/data/files-lazy.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getFilesystem() {
        return fetch(this.contextPath + '/demo/data/filesystem.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getLazyFilesystem() {
        return fetch(this.contextPath + '/demo/data/filesystem-lazy.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
