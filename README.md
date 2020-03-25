# next-with-contao-api
This package provides an example implementation using React Hooks inside Next.js.

### Requirements

A valid contao installation with the  [Contao Content API](https://github.com/DieSchittigs/contao-content-api-bundle) extension installed.

Using next.js the Contao API can be fetched on build time, when rendering on server (SSR) or even on the client side (CSR).
See the example implementation for more details.

### Further goals

Currently the hooks are extended with data models and dynamic resolving of pages using slugs.
Further a dynamic binding shall be implemented to assign different Contao Content Elements to JSX Components.

## Example

The example requires an existing installation of Contao 4.4+ and the Contao Content API.
You can install the Contao Content API by using the Contao Manager or the composer CLI:

    composer require dieschittigs/contao-content-api
    

When building the example the resulting pages will be:

    Page                                                           Size     First Load
    ┌ ○ /                                                          1.84 kB     78.5 kB
    ├   /_app                                                      11.9 kB     76.7 kB
    ├ ○ /404                                                       2.61 kB     79.3 kB
    ├ ○ /csr                                                       1.14 kB     82.9 kB
    ├ ○ /csr/another                                               1.15 kB     82.9 kB
    ├ ○ /csr/context                                               1.13 kB     82.9 kB
    ├ ○ /csr/context/another                                       1.13 kB     82.9 kB
    ├ λ /ssr                                                       1.15 kB     82.9 kB
    ├ λ /ssr/another                                               1.15 kB     82.9 kB
    ├ ○ /ssr/context                                               1.12 kB     82.9 kB
    ├ ○ /ssr/context/another                                       1.12 kB     82.9 kB
    ├ ● /static                                                    392 B       82.2 kB
    └ ● /static/another                                            397 B       82.2 kB

    λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
    ○  (Static)  automatically rendered as static HTML (uses no initial props)
    ●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
