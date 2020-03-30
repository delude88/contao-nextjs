# use-contao-next
This package provides an example implementation using React Hooks inside Next.js.

### Requirements

A valid contao installation with the  [Contao Content API](https://github.com/DieSchittigs/contao-content-api-bundle) extension installed.

Using next.js the Contao API can be fetched on build time, when rendering on server (SSR) or even on the client side (CSR).
See the example implementation for more details.

### Further goals

Currently the hooks are extended with data models and dynamic resolving of pages using slugs.
Further a dynamic binding shall be implemented to assign different Contao Content Elements to JSX Components.

## Example

[Live Example](https://use-contao.tobiashegemann.now.sh/)

### Using example

The example requires an existing installation of Contao 4.4+ and the Contao Content API.
You can install the Contao Content API by using the Contao Manager or the composer CLI:

    composer require dieschittigs/contao-content-api
    

To build the example, run
    
    npm run build
    
Then the example can be started using

    cd example && npm run start
    

When building the example the resulting pages will be:

    Page                                                           Size     First Load
    ┌ ○ /                                                          1.83 kB     80.8 kB
    ├   /_app                                                      11.2 kB       79 kB
    ├ ○ /404                                                       3.15 kB     82.1 kB
    ├ ○ /csr                                                       451 B       84.6 kB
    ├ ○ /csr/another                                               457 B       84.6 kB
    ├ ○ /csr/context                                               419 B       84.5 kB
    ├ ○ /csr/context/another                                       425 B       84.5 kB
    ├ λ /page/[...slug]                                            343 B       79.3 kB
    ├ λ /ssr                                                       416 B       84.5 kB
    ├ λ /ssr/another                                               500 B       84.6 kB
    ├ ● /static                                                    393 B       84.5 kB
    └ ● /static/another                                            397 B       84.5 kB
    
    λ  (Lambda)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
    ○  (Static)  automatically rendered as static HTML (uses no initial props)
    ●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
