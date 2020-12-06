import User, { IUser } from '../Models/User.mode';

interface ICreateUserInput {
  Email: IUser['Email'];
  Fname: IUser['Fname'];
  Lname: IUser['Lname'];
  Phone: IUser['Phone'];
  EmployeeID: IUser['EmployeeID'];
}

async function CreateEmployee({
  Email,
  Fname,
  Lname,
  Phone,
  EmployeeID,
}: ICreateUserInput): Promise<IUser> {
  return User.create({
    Email,
    Fname,
    Lname,
    Phone,
    EmployeeID,
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
}

async function FindOneEmployeeAndUpdate(
  EmployeeID: string,
  newData: ICreateUserInput
) {
  return User.findOneAndUpdate({ EmployeeID }, newData)
    .then((user: any) => {
      if (user) {
        console.log(
          `This employee ${EmployeeID} already exists and has been updated`
        );
        return true;
      } else return false;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
}

async function FindAllEmployees() {
  return User.find()
    .then((employees: any[]) => {
      if (employees) {
        return employees.map((employee) => ({
          EmployeeID: employee.EmployeeID,
          Fname: employee.Fname,
          Lname: employee.Lname,
          Phone: employee.Phone,
          'Date Created': employee.createdAt,
          'Date Updated': employee.updatedAt,
        }));
      }
      return null;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
}
export default {
  CreateEmployee,
  FindOneEmployeeAndUpdate,
  FindAllEmployees,
};
