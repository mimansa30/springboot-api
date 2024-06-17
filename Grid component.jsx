import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

const GridExample = ({ rowData }) => {
    const [gridRowData, setGridRowData] = useState([]);

    useEffect(() => {
        setGridRowData(rowData);
    }, [rowData]);

    const colDefs = [
        { field: "environment", filter: 'agSetColumnFilter', floatingFilter: true },
        { field: "region", filter: 'agSetColumnFilter', floatingFilter: true },
        { field: "service", filter: true, floatingFilter: true },
        { field: "stage" },
        { field: "startCommand" },
        {
            headerName: "healthStatus",
            field: "healthStatus",
            cellStyle: (params) => ({
                color: params.value === "green" ? "green" : "red",
            }),
        },
        {
            headerName: "Action",
            field: "Action",
            cellRenderer: 'CustomButtonComponent',
        }
    ];

    return (
        <div className="content">
            <div className="grid-container">
                <div className="ag-theme-alpine ag-grid-full-width">
                    <AgGridReact
                        rowData={gridRowData}
                        columnDefs={colDefs}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
            </div>
        </div>
    );
};

export default GridExample;
