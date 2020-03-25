import React, {createContext, useContext, useEffect, useState} from "react";
import {getContao} from "./util";
import {ContaoModel} from "./model/ContaoModel";

const ContaoContext = createContext<ContaoModel>(null);

const useContaoContext = () => useContext<ContaoModel>(ContaoContext);
const useContaoCSR = (server: string) => {
    const [contao, setContao] = useState<ContaoModel>(null);

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
    const [contao, setContao] = useState<ContaoModel>(props.contao);
    useEffect(() => {
        if (!contao) {
            //console.log("Fetching contao by Provider");
            getContao(props.server)
                .then(
                    c => setContao(c)
                );

        }
    }, [contao]);

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

const withContaoSSR = (WrappedComponent: any, server?: string) => {
    const WithContaoSSRComp = ({contao, url}) => {
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
