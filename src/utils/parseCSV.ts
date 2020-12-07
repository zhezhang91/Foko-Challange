import fs from 'fs';
import csv from 'csv-parser';
import validator from './validator';
import EmployeeAPI from '../controllers/Employee.controller';
import outSourceData from './outSourceData';

export default (csvPath: string, csvOutputPath: string) => {
  const csvData = [];
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('end', async () => {
      console.log('Finish parse CSV file.....');
      const validatedData = validator(csvData);
      await Promise.all(
        validatedData.map(async (data) => {
          const { EmployeeID } = data;
          const isEmployeeExisted = await EmployeeAPI.FindOneEmployeeAndUpdate(
            EmployeeID,
            data
          );
          if (!isEmployeeExisted) {
            await EmployeeAPI.CreateEmployee(data);
          }
        })
      );
      csvOutputPath && (await outSourceData(csvOutputPath));
    });
};
