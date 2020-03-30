import Link from "next/link";
import {Button} from "baseui/button";
import {useEffect} from "react";
import {useContao} from "use-contao";

const server: string = "https://contao.v22019048220387295.hotsrv.de";
export default () => {
    const contao = useContao({server: {host: server}, sitemap: true});

    useEffect(() => {
        if (contao) {
            console.log("Have a contao update");
            console.log(contao);
        } else {
            console.log("Contao is null");
        }
    }, [contao]);

    console.log("RENDER");

    return (
        <>
            <h1>Dynamic usage of Contao API</h1>
            {contao && contao.sitemap && (
                <>
                    <h1>{contao.sitemap.title}</h1>
                    <p>
                        {contao.sitemap.description}
                    </p>
                </>
            )}
            <p>
                <Link href="/csr/another">
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
        </>
    )
}
