import {GetStaticProps} from "next";
import Link from "next/link";
import {Button} from "baseui/button";
import {useStaticContao} from "use-contao-next";

const server = "https://contao.v22019048220387295.hotsrv.de";

const StaticPage = ({contao}) => {
    return (
        <div>
            <h1>Static usage of Contao API</h1>
            {contao && contao.sitemap && (
                <h1>{contao.sitemap.title}</h1>
            )}
            <p>
                <Link href="/static/another">
                    <Button>
                        Navigate to another page
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

export const getStaticProps: GetStaticProps = useStaticContao( {server: {host: server}, sitemap: true});

export default StaticPage;
