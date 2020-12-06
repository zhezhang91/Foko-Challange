import fs from 'fs';
import csv from 'csv-parser';
import validator from './validator';
import UserAPI from '../Controllers/User.controller';
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
          const isEmployeeExisted = await UserAPI.FindOneEmployeeAndUpdate(
            EmployeeID,
            data
          );
          if (!isEmployeeExisted) {
            await UserAPI.CreateEmployee(data);
          }
        })
      );
      csvOutputPath && (await outSourceData(csvOutputPath));
    });
};
