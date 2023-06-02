import getConfig from 'next/config';

export class FileService {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getFiles() {
        return fetch(this.contextPath + '/demo/data/file-management.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.files);
    }

    getMetrics() {
        return fetch(this.contextPath + '/demo/data/file-management.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.metrics);
    }

    getFoldersSmall() {
        return fetch(this.contextPath + '/demo/data/file-management.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.folders_small);
    }

    getFoldersLarge() {
        return fetch(this.contextPath + '/demo/data/file-management.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.folders_large);
    }
}
