import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {getContao} from "./util";
import {ContaoModel} from "./model/ContaoModel";
import {GetStaticProps} from "next";

const ContaoContext = createContext<ContaoModel | undefined>(undefined);

const useContaoContext = () => useContext<ContaoModel | undefined>(ContaoContext);

const useContaoCSR = (server: string) => {
    const [contao, setContao] = useState<ContaoModel | undefined>(undefined);

    useEffect(() => {
        //console.log("Fetching contao on client side");
        getContao(server)
            .then(
                c => setContao(c)
            );
    }, []);

    return contao;
};
export const useContao = (server?: string) => server ?
    useContaoCSR(server) : useContaoContext();

export const ContaoProvider = (props: {
    children: React.ReactNode,
    server: string,
    contao?: ContaoModel
}) => {
    const [contao, setContao] = useState<ContaoModel | undefined>(props.contao);
    useEffect(() => {
        if (!contao) {
            //console.log("Fetching contao by Provider");
            getContao(props.server)
                .then(
                    c => setContao(c)
                );

        }
    }, [contao, props.server]);

    return (
        <ContaoContext.Provider value={contao}>
            {props.children}
        </ContaoContext.Provider>
    )
};

export const withContao = (WrappedComponent: any, server?: string) => server ? withContaoSSR(WrappedComponent, server) : withContaoContext(WrappedComponent);

export const withContaoContext = (WrappedComponent: any) => () => {
    return <WrappedComponent contao={useContaoContext()}/>;
};

const withContaoSSR = (WrappedComponent: any, server: string) => {
    const WithContaoSSRComp = ({contao}: any) => {
        return (
            <ContaoProvider server={server} contao={contao}>
                <WrappedComponent contao={contao}/>
            </ContaoProvider>
        )
    };

    WithContaoSSRComp.getInitialProps = async () => {
        const contao: ContaoModel | null = await getContao(server);
        //console.log("Fetching contao inside getInitialProps");
        return {
            contao: contao
        }
    };

    return WithContaoSSRComp;
};

export const useStaticProps = (server: string, revalidate?: number | boolean): GetStaticProps => {
    return async () => {
        const contao = await getContao(server);

        return {
            props: {
                contao
            },
            revalidate: revalidate
        };
    };
};
