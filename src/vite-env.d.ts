/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'vite-plugin-eslint' {
  import { Plugin } from 'vite';
  interface Options {
    fix?: boolean;
    include?: string | string[];
    exclude?: string | string[];
    cache?: boolean;
    emitError?: boolean;
    emitWarning?: boolean;
  }
  export default function eslint(options?: Options): Plugin;
}
