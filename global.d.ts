declare module "vue" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ZButton: (typeof import("z-ui"))["ZButton"];
    ZIcon: (typeof import("z-ui"))["ZIcon"];
    ZConfigProvider: (typeof import("z-ui"))["ZConfigProvider"];
  }
}

export {};
