import React from 'react';
import { Table } from '@mantine/core';

interface TableComponentProps<T> {
  data: T[];
  columns: { name: string, title: string }[];
}

const TableComponent = <T,>({ data, columns }: TableComponentProps<T>) => {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.name}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(column => (
              <td key={column.name}>{String(row[column.name as keyof T])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
