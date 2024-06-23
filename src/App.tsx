import React, { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import TableComponent from './components/TableComponent';
import { processCropData } from './utils/dataUtils';
import './App.css';

interface CropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': string | number;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string | number;
  'Area Under Cultivation (UOM:Ha(Hectares))': string | number;
}

const App: React.FC = () => {
  const [cropData, setCropData] = useState<CropData[]>([]);

  useEffect(() => {
    // Simulated fetch or import of your data
    import('./data/agricultureData.json').then(data => {
      setCropData(data.default);
    });
  }, []);

  const { maxCropData, avgCropData } = processCropData(cropData);

  // Columns for the tables
  const maxMinColumns = [
    { name: 'year', title: 'Year' },
    { name: 'maxCrop', title: 'Crop with Maximum Production in that Year' },
    { name: 'minCrop', title: 'Crop with Minimum Production in that Year' },
  ];

  const avgColumns = [
    { name: 'crop', title: 'Crop' },
    { name: 'avgYield', title: 'Average Yield of the Crop between 1950-2020'},
    { name: 'avgArea', title: 'Average Cultivation Area of the Crop between 1950-2020' },
  ];

  return (
    <MantineProvider>
      <div className="App">
        <h1>Agriculture Analytics</h1>

        <h2>Table 1: Crop Production Analysis</h2>
        <TableComponent
          data={maxCropData}
          columns={maxMinColumns}
        />

        <h2>Table 2: Average Yield and Cultivation Area</h2>
        <TableComponent
          data={avgCropData}
          columns={avgColumns}
        />
      </div>
    </MantineProvider>
  );
};

export default App;
