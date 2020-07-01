import React from "react";
import { IReadDataItem } from "../../interfaces/IReadDataItem";
import { Panel } from "../../Panel/Panel";
import { IReadHistoricalData } from "../../interfaces/IReadHistoricalData";
import { APIService } from "../../services/APIService";
import * as d3 from "d3";

interface IItemChartProps {
  item: IReadDataItem | null;
  apiService: APIService;
}

interface IItemChartState {
  dataLoaded: boolean;
  startTime: string;
  endTime: string;
}

export class ItemChart extends React.Component<
  IItemChartProps,
  IItemChartState
> {
  constructor(props: IItemChartProps) {
    super(props);

    this.state = {
      dataLoaded: false,
      startTime: "2020-5-28",
      endTime: "2020-5-30",
    };
  }

  componentDidMount() {
    this.fetchHistoricalData();
  }

  private fetchHistoricalData() {
    if (this.props.item === null) {
      return;
    }

    this.props.apiService
      .readHistoricalData(
        this.props.item.Path,
        this.state.startTime,
        this.state.endTime
      )
      .then((data) => {
        this.setState({
          ...this.state,
          dataLoaded: true,
        });

        this.drawChart(data);
      });
  }

  private drawChart({ data }: IReadHistoricalData) {
    const width = 850;

    const height = 550;

    const formattedData = data.items[0].intervals.map((interval) => ({
      time: interval.T,
      value: interval.V,
    }));

    const svg = d3.select("#chart").attr("width", width).attr("height", height);

    const xAxis = d3
      .scaleLinear()
      .domain(d3.extent(formattedData, (d: any) => d.time) as any)
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 20})`)
      .call(
        d3
          .axisBottom(xAxis)
          .ticks(5)
          .tickFormat((d: any) => d3.timeFormat("%Y-%m-%d %H:%m")(new Date(d)))
      );

    const yAxis = d3
      .scaleLinear()
      .domain([0, d3.max(formattedData, (d: any) => d.value) as any])
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(25, 0)`)
      .call(d3.axisLeft(yAxis).ticks(5));

    const area = d3
      .area()
      .x((d: any) => xAxis(d.time))
      .y0(height)
      .y1((d: any) => yAxis(d.value));

    svg
      .append("path")
      .datum(formattedData)
      .attr("fill", "#009100")
      .attr("fill-opacity", 0.25)
      .attr("stroke", "#009100")
      .attr("stroke-width", 1.5)
      .attr("d", area as any);
  }

  render() {
    if (this.props.item === null) {
      return (
        <Panel title="Data" span={3}>
          <div className="p-2">First, select an item from the menu...</div>
        </Panel>
      );
    }

    if (!this.state.dataLoaded) {
      return (
        <Panel title="Data" span={3}>
          <div className="p-2">Loading the data...</div>
        </Panel>
      );
    }

    return (
      <Panel title="Data" span={3}>
        <div className="p-2 space-y-4">
          <svg id="chart" />
          <div className="flex flex-col text-xs">
            <span>
              Start time: <b>{this.state.startTime}</b>
            </span>
            <span>
              End time: <b>{this.state.endTime}</b>
            </span>
          </div>
        </div>
      </Panel>
    );
  }
}
