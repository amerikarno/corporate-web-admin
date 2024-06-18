/// <reference types="vite/client" />


module '*.jpg' ;
module '*.png' ;
module '*.svg' ;
module '*.gif' ;
module '*.mp4' ;

declare module "preline"
declare module "react-searchable-dropdown"
declare module "react-range-slider-input"
declare module "react-simple-maps"
declare module "react-select"
declare module "react-select/creatable"


interface ImportMetaEnv {
    readonly BASE_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }