import { IReadHistoricalDataItem } from "./IReadHistoricalDataItem";

export interface IReadHistoricalData {
  data: {
    start_time: string;
    end_time: string;
    items: IReadHistoricalDataItem[];
  };
}
