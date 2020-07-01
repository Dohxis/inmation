export interface IReadHistoricalDataItem {
  p: string;
  aggregate: string;
  intervals: { Q: number; T: number; V: number }[];
}
