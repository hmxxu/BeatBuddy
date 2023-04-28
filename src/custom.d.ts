// * This file allows for different file types like .svg, .jpg to be correctly
// * interpreted by Typescript.

// ! note: If you want Typescript to support more file types, simply add them
// ! here

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}
