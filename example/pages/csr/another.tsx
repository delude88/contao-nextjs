import Link from "next/link";
import {Button} from "baseui/button";
import {useContao} from "use-contao-next";

const server: string = "https://contao.v22019048220387295.hotsrv.de";
export default () => {
    const contao = useContao({server: {host: server}, sitemap: true});

    return (
        <>
            <h1>Another dynamic usage of Contao API</h1>
            {contao && contao.sitemap && (
                <>
                    <h1>{contao.sitemap.title}</h1>
                    <p>
                        {contao.sitemap.description}
                    </p>
                </>
            )}
            <p>
                <Link href="/csr">
                    <Button>
                        Navigate to page before
                    </Button>
                </Link>
            </p>
            <p>
                <Link href="/">
                    <Button>Back to overview</Button>
                </Link>
            </p>
        </>
    )
}
