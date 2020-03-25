import {useContao} from "../../lib/contao";
import Link from "next/link";
import {Button} from "baseui/button";

const server: string = "https://contao.v22019048220387295.hotsrv.de";
export default () => {
    const contao = useContao(server);

    return (
        <>
            <h1>Another dynamic usage of Contao API</h1>
            {contao && (
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
