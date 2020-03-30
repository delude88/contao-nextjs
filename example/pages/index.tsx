import Link from "next/link";

export default () => {
    return (
        <div>
            <h1>Usages of Contao API</h1>
            <ul>
                <li>
                    <Link href="/static">
                        <a>
                            Static usage (using getStaticProps)
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/ssr">
                        <a>
                            Using SSR only
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/csr">
                        <a>
                            Using CSR only
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/csr/context">
                        <a>
                            Using CSR and Context API (see _app.tsx)
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
