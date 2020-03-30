import {GetServerSideProps, GetStaticProps} from "next";
import * as React from "react";
import {ContaoCache, ContaoInitialRequest, getContao} from "use-contao";

export * from "use-contao";

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

export const useServerSideContao = (options: ContaoInitialRequest): GetServerSideProps => {
    return async () => {
        const contao: ContaoCache = await getContao(options.server.host, options.server.lang ? options.server.lang : null, options);
        return {
            props: {contao}
        }
    };
};

export const useStaticContao = (options: ContaoInitialRequest, revalidate?: number | boolean): GetStaticProps => {
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
