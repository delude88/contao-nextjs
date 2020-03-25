import fetch, {Response} from 'node-fetch';
import {PageModel, PageModelFromJson} from "./model/PageModel";
import {ContaoModel} from "./model/ContaoModel";

const Routes = {
  sitemap: "/api/sitemap"
};

export const getSitemap = (server: string): Promise<PageModel | undefined> => {
  return fetch(server + Routes.sitemap)
    .then((r: Response) => r.json())
    .then((a: any) => a.length > 0 ? PageModelFromJson(a[0]) : undefined);
};


export const getContao = (server: string): Promise<ContaoModel> => {
  return getSitemap(server)
    .then(
      (sitemap: PageModel | undefined) =>
        ({
          server: server,
          sitemap: sitemap
        })
    );
};
