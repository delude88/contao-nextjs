import {GetServerSideProps, GetStaticProps} from "next";
import * as React from "react";
import {ContaoCache, ContaoInitialRequest} from "./model/ContaoModel";
import {getContao} from "./util";

export const withContaoSSR = (WrappedComponent: any, options: ContaoInitialRequest) => {
    const WithContaoSSR = (props: { contao: ContaoCache }) => {
        console.log("DATA:");
        console.log(props.contao);
        return <WrappedComponent contao={props.contao}/>;
    };

    WithContaoSSR.getInitialProps = async () => {
        console.log("Fetching contao inside getInitialProps");
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        console.log(contao);
        return {contao}
    };
    return WithContaoSSR;
};

export const useServerSideProps = (options: ContaoInitialRequest): GetServerSideProps => {
    return async () => {
        console.log("Fetching contao inside useServerSideProps");
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        return {
            props: {contao}
        }
    };
};

export const useStaticProps = (options: ContaoInitialRequest, revalidate?: number | boolean): GetStaticProps => {
    return async () => {
        console.log("Fetching contao inside useStaticProps");
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        return {
            props: {
                contao
            },
            revalidate: revalidate
        };
    };
};
