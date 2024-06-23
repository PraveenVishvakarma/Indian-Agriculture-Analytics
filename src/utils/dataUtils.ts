interface CropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': string | number;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string | number;
  'Area Under Cultivation (UOM:Ha(Hectares))': string | number;
}

interface MaxCropDataRow {
  year: string;
  maxCrop: string;
  minCrop: string;
}

interface AvgCropDataRow {
  crop: string;
  avgYield: number;
  avgArea: number;
}

export const processCropData = (data: CropData[]) => {
  const maxCropData: MaxCropDataRow[] = [];
  const avgCropData: { [crop: string]: { totalYield: number, totalArea: number, count: number } } = {};

  data.forEach(item => {
    const year = item.Year.split(',')[1].trim();
    const cropName = item['Crop Name'];
    const production = parseFloat(item['Crop Production (UOM:t(Tonnes))'] as string) || 0;
    const yieldCrops = parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string) || 0;
    const area = parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))'] as string) || 0;

    // Calculate max and min crop production for each year
    const existingYearData = maxCropData.find(d => d.year === year);
    if (!existingYearData) {
      maxCropData.push({ year, maxCrop: cropName, minCrop: cropName });
    } else {
      if (production > parseFloat(data.find(d => d['Crop Name'] === existingYearData.maxCrop && d.Year.includes(year))?.['Crop Production (UOM:t(Tonnes))'] as string || '0')) {
        existingYearData.maxCrop = cropName;
      }
      if (production < parseFloat(data.find(d => d['Crop Name'] === existingYearData.minCrop && d.Year.includes(year))?.['Crop Production (UOM:t(Tonnes))'] as string || '0')) {
        existingYearData.minCrop = cropName;
      }
    }

    // Calculate average yield and area for each crop
    if (!avgCropData[cropName]) {
      avgCropData[cropName] = { totalYield: yieldCrops, totalArea: area, count: 1 };
    } else {
      avgCropData[cropName].totalYield += yieldCrops;
      avgCropData[cropName].totalArea += area;
      avgCropData[cropName].count += 1;
    }
  });

  const avgCropDataRows: AvgCropDataRow[] = Object.keys(avgCropData).map(crop => ({
    crop,
    avgYield: parseFloat((avgCropData[crop].totalYield / avgCropData[crop].count).toFixed(3)),
    avgArea: parseFloat((avgCropData[crop].totalArea / avgCropData[crop].count).toFixed(3)),
  }));

  return { maxCropData, avgCropData: avgCropDataRows };
};
