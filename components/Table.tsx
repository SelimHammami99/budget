"use client";

import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useState } from "react";
import { Badge } from "./ui/badge";

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Create new GridExample component
const GridExample = ({ data }) => {
  //   const [rowData, setRowData] = useState<IRow[]>([
  //     { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //     { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  //     { make: "Mercedes", model: "EQA", price: 48890, electric: true },
  //     { make: "Fiat", model: "500", price: 15774, electric: false },
  //     { make: "Nissan", model: "Juke", price: 20675, electric: false },
  //   ]);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "name", filter: true },
    { field: "type" },
    {
      field: "amount",
      valueFormatter: (params: { value: number }) =>
        new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(params.value),
      cellRenderer: (props: { value: number; data: { type: string } }) => {
        const formatter = new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(props.value);

        return (
          <Badge
            style={{
              backgroundColor: `${
                props.data.type.toLowerCase() === "expense" ? "red" : "green"
              }`,
            }}
            className="text-white font-medium"
          >
            {formatter}
          </Badge>
        );
      },
    },
  ]);

  return (
    <div className={"ag-theme-alpine-dark"} style={{ height: 500, width: 600 }}>
      <AgGridReact rowData={data} columnDefs={colDefs} />
    </div>
  );
};

export default GridExample;
