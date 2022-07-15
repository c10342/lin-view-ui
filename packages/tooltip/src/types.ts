import { CSSProperties } from "vue";
export type Placement = "bottom" | "top" | "left" | "right";
export interface Options {
  style?: CSSProperties;
  placement?: Placement;
  text: string;
}
