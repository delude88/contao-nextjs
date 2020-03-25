import fetch from 'node-fetch';
import {PageModel, PageModelFromJson} from "./model/PageModel";
import {ContaoModel} from "./model/ContaoModel";

const Routes = {
    sitemap: "/api/sitemap"
};

export const getSitemap = (server: string): Promise<PageModel> => {
    return fetch(server + Routes.sitemap)
        .then(r => r.json())
        .then(a => a.length > 0 ? PageModelFromJson(a[0]) : null);
};


export const getContao = (server: string): Promise<ContaoModel> => {
    return getSitemap(server)
        .then(
            (sitemap) =>
                ({
                    server: server,
                    sitemap: sitemap
                })
        );
};
