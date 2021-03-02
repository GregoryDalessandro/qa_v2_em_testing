import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as employees from "../employees.json";

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
  test("Can add and delete an employee", async () => {
    let newEmployee = {
      name: "Test Employee",
      phone: 1234567890,
      email: "test@email.com",
      title: "test person",
    };
    await page.addEmployee(newEmployee);
    let employee = await page.getCurrentEmployee();
    expect(employee.name).toEqual(newEmployee.name);
    expect(employee.phone).toEqual(newEmployee.phone);
    expect(employee.email).toEqual(newEmployee.email);
    expect(employee.title).toEqual(newEmployee.title);
    await page.deleteEmployee("Test Employee");
    let employeeList = await page.getEmployeeList();
    expect(employeeList).not.toContain("Test Employee");
  });
  //I want to iterate through the json file and add the employees if they don't already exist in the app's database
  test("Can iterate through employees.json and add any employee that doesn't exist in the react app's employee list", async() => {
    // for each employee in from the employees.json file
    // if the name does not exist in the react app's employee list..\
      // if New Employee exists..
        // select New Employee
        // select Name input field
          // clear text
          // sendkeys of current employee's name
        // select Phone Number input field
          // clear text
          // sendkeys of current employee's phone number
        // select email Address input field
          // clear text
          //send keys of current employee's email address
        // select Title
          // clear text
        // send keys of current employee's title
        // select the save button (click)
      // else select add employee
        // repeat steps from lines 40-52 (adding of information)
        // select the save button (click)


    //TODO: delete this object - it is just an example for me to use to add an employee
    //{
    //   "name": "Obi-Wan kenobi",
    //   "phone": 555555555,
    //   "email": "totallynotbenkenobbi.rep",
    //   "title": "Screenshot"
    // }
  });
});
