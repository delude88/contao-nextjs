import fetch, {Response} from 'node-fetch';
import {PageModel, PageModelFromJson} from "./model/PageModel";
import {ContaoCache, ContaoDataRequest} from "./model/ContaoModel";
import ModuleModel, {ModuleModelFromJson} from "./model/ModuleModel";
import UserModel, {UserModelFromJson} from "./model/UserModel";
import NewsReaderModel, {NewsReaderModelFromJson} from "./model/NewsReaderModel";
import UrlModel, {UrlModelFromJson} from "./model/UrlModel";

const Routes = {
    sitemap: "/api/sitemap",
    page: "/api/page",
    module: "/api/module",
    user: "/api/user",
    newsreader: "/api/newsreader",
    urls: "/api/urls"
};

const resolveLanguage = (lang?: string, extend?: boolean): string => {
    if (!lang)
        return "";
    if (extend)
        return "&lang=" + lang;
    return "?lang=" + lang;
};

const getSitemap = (server: string, lang?: string): Promise<PageModel | null> => {
    return fetch(server + Routes.sitemap + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => a.length > 0 ? PageModelFromJson(a[0]) : null);
};
const getUrls = (server: string, lang?: string): Promise<UrlModel[]> => {
    return fetch(server + Routes.urls + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => UrlModelFromJson(a[0]));
};
const getPage = (server: string, url: string, lang?: string): Promise<PageModel | undefined> => {
    return fetch(server + Routes.page + "?url=" + url + resolveLanguage(lang, true))
        .then((r: Response) => r.json())
        .then((a: any) => a ? PageModelFromJson(a[0]) : undefined);
};
const getModule = (server: string, id: number, lang?: string): Promise<ModuleModel | undefined> => {
    return fetch(server + Routes.module + "?id=" + id + resolveLanguage(lang, true))
        .then((r: Response) => r.json())
        .then((a: any) => a ? ModuleModelFromJson(a[0]) : undefined);
};
const getUser = (server: string, lang?: string): Promise<UserModel | null> => {
    return fetch(server + Routes.user + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => a ? UserModelFromJson(a[0]) : null);
};
const getNewsReader = (server: string, url: string, lang?: string): Promise<NewsReaderModel | undefined> => {
    return fetch(server + Routes.newsreader + "?url=" + url + resolveLanguage(lang))
        .then((r: Response) => r.json())
        .then((a: any) => a ? NewsReaderModelFromJson(a[0]) : undefined);
};

/*
export const getModuleUsingCache = async (cache: ContaoCache, server: string, id: number, lang?: string): Promise<ModuleModel | undefined> => {
    if (cache.modules[id])
        return cache.modules[id];
    const module: ModuleModel | undefined = await getModule(server, id, lang);
    if (module)
        cache.modules[id] = module;
    return module;
};
export const getNewsReaderUsingCache = async (cache: ContaoCache, server: string, url?: string, lang?: string): Promise<NewsReaderModel | undefined> => {
    url = url ? url?.startsWith("/") ? url : "/" + url : "/";
    if (cache.newsreader[url])
        return cache.newsreader[url];
    const newsreader: NewsReaderModel | undefined = await getNewsReader(server, url, lang);
    if (newsreader)
        cache.newsreader[url] = newsreader;
    return newsreader;
};
export const getSitemapUsingCache = async (cache: ContaoCache, server: string, lang?: string): Promise<PageModel | null> => {
    console.log("getSitemapUsingCache");
    if (cache.sitemap)
        return cache.sitemap;
    cache.sitemap = await getSitemap(server, lang);
    return cache.sitemap;
};
export const getUserUsingCache = async (cache: ContaoCache, server: string, lang?: string): Promise<UserModel | null> => {
    if (cache.user)
        return cache.user;
    cache.user = await getUser(server, lang);
    return cache.user;
};
export const getUrlsUsingCache = async (cache: ContaoCache, server: string, lang?: string): Promise<UrlModel[]> => {
    if (cache.urls)
        return cache.urls;
    cache.urls = await getUrls(server, lang);
    return cache.urls;
};
export const getPageUsingCache = async (cache: ContaoCache, server: string, url?: string, lang?: string): Promise<PageModel | undefined> => {
    url = url ? url?.startsWith("/") ? url : "/" + url : "/";
    if (cache.pages[url])
        return cache.pages[url];
    const page: PageModel | undefined = await getPage(server, url, lang);
    if (page)
        cache.pages[url] = page;
    return page;
};*/

export const getContao = async (host: string, lang: string | null, request: ContaoDataRequest) => {
    const result: ContaoCache = {
        server: {
            host: host,
            lang: lang
        },
        pages: [],
        modules: [],
        newsreaders: [],
        sitemap: null,
        user: null,
        urls: null
    };

    if (request.module) {
        const module: ModuleModel | undefined = await getModule(host, request.module, lang ? lang : undefined);
        if (module)
            result.modules.push(
                module
            );
    }
    if (request.modules) {
        for (const id of request.modules) {
            const module: ModuleModel | undefined = await getModule(host, id, lang ? lang : undefined);
            if (module)
                result.modules.push(module);
        }
    }
    if (request.newsreader) {
        const newsreader: NewsReaderModel | undefined = await getNewsReader(host, request.newsreader, lang ? lang : undefined);
        if (newsreader)
            result.newsreaders.push(
                newsreader
            );
    }
    if (request.newsreaders)
        for (const url of request.newsreaders) {
            const newsreader: NewsReaderModel | undefined = await getNewsReader(host, url, lang ? lang : undefined);
            if (newsreader)
                result.newsreaders.push(newsreader);
        }
    if (request.page) {
        const page: PageModel | undefined = await getPage(host, request.page, lang ? lang : undefined);
        if (page)
            result.pages.push(
                page
            );
    }
    if (request.pages)
        for (const url of request.pages) {
            const page: PageModel | undefined = await getPage(host, url, lang ? lang : undefined);
            if (page)
                result.pages.push(page);
        }
    if (request.sitemap)
        result.sitemap = await getSitemap(host, lang ? lang : undefined);
    if (request.user)
        result.user = await getUser(host, lang ? lang : undefined);
    if (request.urls)
        result.urls = await getUrls(host, lang ? lang : undefined);
    return result;
};
/*
export const getContaoOld = async (host: string, options?: ContaoRequestOptions): Promise<ContaoAPI> => {
    const cache: ContaoCache = {
        server: {
            url: host,
            lang: options && options.lang ? options.lang : null
        },
        sitemap: null,
        pages: [],
        modules: [],
        newsreader: [],
        user: null,
        urls: null
    };
    if (options) {
        console.log("Handling options");
        if (options.sitemap) {
            console.log("Fetching sitemap");
            await getSitemapUsingCache(cache, host, options.lang);
        }
        if (options.urls) {
            await getUrlsUsingCache(cache, host, options.lang);
        }
        if (options.pages) {
            for (const url of options.pages) {
                await getPageUsingCache(cache, host, url, options.lang);
            }
        }
        if (options.modules) {
            for (const id of options.modules) {
                await getModuleUsingCache(cache, host, id, options.lang);
            }
        }
        if (options.user) {
            await getUserUsingCache(cache, host, options.lang);
        }
        if (options.newsreader) {
            for (const url of options.newsreader) {
                await getNewsReaderUsingCache(cache, host, url, options.lang);
            }
        }
    }
    return {
        ...cache,
        getUrls: (lang?: string) => getUrlsUsingCache(cache, host, lang ? lang : cache.server && cache.server.lang ? cache.server.lang : undefined),
        getSitemap: (lang?: string) => getSitemapUsingCache(cache, host, lang ? lang : cache.server && cache.server.lang ? cache.server.lang : undefined),
        getPage: (url?: string, lang?: string) => getPageUsingCache(cache, host, url, lang ? lang : cache.server && cache.server.lang ? cache.server.lang : undefined),
        getModule: (id: number, lang?: string) => getModuleUsingCache(cache, host, id, lang ? lang : cache.server && cache.server.lang ? cache.server.lang : undefined),
        getUser: (lang?: string) => getUserUsingCache(cache, host, lang ? lang : cache.server && cache.server.lang ? cache.server.lang : undefined),
        getNewsreader: (url?: string, lang?: string) => getNewsReaderUsingCache(cache, host, url, lang ? lang : cache.server && cache.server.lang ? cache.server.lang : undefined)
    }
};

*/
