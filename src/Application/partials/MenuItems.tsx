import React from "react";
import { IReadDataItem } from "../../interfaces/IReadDataItem";
import { Panel } from "../../Panel/Panel";

interface IMenuItems {
  items: IReadDataItem[] | null;
  selectItem: (item: IReadDataItem) => void;
}

export const MenuItems: React.FC<IMenuItems> = ({ items, selectItem }) => {
  const content =
    items === null ? (
      <span className="py-2">Loading...</span>
    ) : (
      <ul className="py-2 space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center px-2 hover:bg-inmation-dark cursor-pointer transition duration-150"
            onClick={() => selectItem(item)}
          >
            <div className="w-2 h-2 bg-inmation-green rounded-full mr-2" />
            <span>{item.Name}</span>
          </li>
        ))}
      </ul>
    );

  return (
    <Panel title="Menu" span={1}>
      {content}
    </Panel>
  );
};
