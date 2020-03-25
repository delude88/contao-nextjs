import Link from "next/link";
import {Button} from "baseui/button";
import {withContao} from "../../../lib/contao";

const SSRPage = ({contao}) => {
    return (
        <div>
            <h1>SSR and Context API usage of Contao API</h1>
            {contao && contao.sitemap && (
                <h1>{contao.sitemap.title}</h1>
            )}
            <p>
                <Link href="/ssr/context/another">
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
export default withContao(SSRPage);
