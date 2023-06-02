import getConfig from 'next/config';

export class EventService {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getEvents() {
        return fetch(this.contextPath + '/demo/data/scheduleevents.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
