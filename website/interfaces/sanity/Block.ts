import { Child } from "./Child";

export interface Block {
  _key: string;
  _type: string;
  children: Child[];
  markDefs: any[];
  style: string;
}
