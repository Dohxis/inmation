import { IReadDataItem } from "./IReadDataItem";

export interface IReadData {
  data: {
    i: number;
    p: string;
    q: number;
    t: string;
    v: IReadDataItem[];
  }[];
}
