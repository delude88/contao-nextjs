import {useServerSideContao} from "use-contao-next";
import Link from "next/link";
import {Button} from "baseui/button";
import {GetServerSideProps} from "next";


const server = "https://contao.v22019048220387295.hotsrv.de";

const SSRPage = ( { contao }) => {
    return (
        <div>
            <h1>getServerSideProps SSR usage of Contao API</h1>
            {contao && contao.sitemap && (
                <h1>{contao.sitemap.title}</h1>
            )}
            <p>
                <Link href="/ssr/another">
                    <Button>
                        Navigate to another page using getInitialProps
                    </Button>
                </Link>
            </p>
            <p>
                <Link href="/">
                    <Button>Back to overview</Button>
                </Link>
            </p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = useServerSideContao({
    server: {
        host: server,
    },
    sitemap: true
});

export default SSRPage;
