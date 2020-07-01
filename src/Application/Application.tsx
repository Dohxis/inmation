import React from "react";
import { APIService } from "../services/APIService";
import { IReadDataItem } from "../interfaces/IReadDataItem";
import { MenuItems } from "./partials/MenuItems";
import { ItemChart } from "./partials/ItemChart";

interface IApplicationProps {
  apiService: APIService;
}

interface IApplicationState {
  readDataItems: IReadDataItem[] | null;
  selectedDataItem: IReadDataItem | null;
}

export class Application extends React.Component<
  IApplicationProps,
  IApplicationState
> {
  constructor(props: IApplicationProps) {
    super(props);

    this.state = {
      readDataItems: null,
      selectedDataItem: null,
    };
  }

  componentDidMount() {
    this.props.apiService
      .read("/System/Core/Examples/Assignment")
      .then(({ data }) => {
        this.setState({
          ...this.state,
          readDataItems: data.flatMap((item) => item.v),
        });
      });
  }

  private selectItem(item: IReadDataItem) {
    this.setState({ ...this.state, selectedDataItem: item });
  }

  render() {
    return (
      <div className="grid grid-cols-4 p-2 gap-2 min-h-screen">
        <MenuItems
          items={this.state.readDataItems}
          selectItem={(item: IReadDataItem) => this.selectItem(item)}
        />
        <ItemChart
          key={this.state.selectedDataItem?.Name}
          item={this.state.selectedDataItem}
          apiService={this.props.apiService}
        />
      </div>
    );
  }
}
