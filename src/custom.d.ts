// * This file allows for different file types like .svg, .jpg to be correctly
// * interpreted by Typescript.

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}