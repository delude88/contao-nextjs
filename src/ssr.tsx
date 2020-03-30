import {GetServerSideProps, GetStaticProps} from "next";
import * as React from "react";
import {ContaoCache, ContaoInitialRequest} from "./model/ContaoModel";
import {getContao} from "./util";

export const withContaoSSR = (WrappedComponent: any, options: ContaoInitialRequest) => {
    const WithContaoSSR = (props: { contao: ContaoCache }) => {
        return <WrappedComponent contao={props.contao}/>;
    };

    WithContaoSSR.getInitialProps = async () => {
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        return {contao}
    };
    return WithContaoSSR;
};

export const useServerSideProps = (options: ContaoInitialRequest): GetServerSideProps => {
    return async () => {
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        return {
            props: {contao}
        }
    };
};

export const useStaticProps = (options: ContaoInitialRequest, revalidate?: number | boolean): GetStaticProps => {
    return async () => {
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        return {
            props: {
                contao
            },
            revalidate: revalidate
        };
    };
};
