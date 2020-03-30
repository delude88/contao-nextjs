import {withContaoSSR} from "use-contao-next";

const server = "https://conftao.v22019048220387295.hotsrv.de";

const Page = ({contao}) => {

    return (
        <div>

        </div>
    )
};
export default withContaoSSR(Page, {server: {host: server}});
