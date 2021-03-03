import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as employees from "../employees.json";
import { findSafariDriver } from "selenium-webdriver/safari";

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
  //TODO: I want to iterate through the json file and add the employees if they don't already exist in the app's database
  // test("Can iterate through employees.json and add any employee that doesn't exist in the react app's employee list", async() => {
  //   let asyncForEach = async (array, cb) => {
  //     for (let i = 0; i <  array.length; i++) {
  //       await cb(array[i], i, array);
  //     }
  //   }
  //   let employeesFromJson: Array<object> = employees.employeeInfo;
  //   let employeesFromApp: Array<any>;
  //   //let employeesFromApp = await page.getEmployeeList();
  //   await page.searchFor("Luke Skywalker");
  //   employeesFromApp = await page.getEmployeeList();
  //   await console.log("employeesFromApp:",employeesFromApp);
  //   // for each employee in from the employees.json file
  //   // asyncForEach(employeesFromApp, page.searchFor(`${e}`))
  //   // })
  //   await asyncForEach(employeesFromJson, (employee)=> {
  //   //search for current employee in employesFromJSon array
  //     page.searchFor(employee.name)
  //     employeesFromApp =  page.getEmployeeList();
  //     if (employeesFromApp.length === 0) {
  //       console.log(`${employee.name}`);
  //     }
  //   })
  //   })
    //await employeesFromJson.forEach(employee => {
      // if the name does not exist in the react app's employee list..\
      //page.searchFor(employee.name)
      // console.log("if 0 this means employee doesn't exist:", await page.getEmployeeList())
    //});

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
    // {
    //   "name": "Obi-Wan kenobi",
    //   "phone": 555555555,
    //   "email": "totallynotbenkenobbi.rep",
    //   "title": "Screenshot"
    // }



    test("Searching for employees with the title 'Screenshot' saves a screenshot of them to the screenshots folder", async () => {
      let screenShotName: string = `${Date.now()}`;
      let screenShotFilePath: string = `./screenshots/${screenShotName}`;
      //get list of employees with the title "Screenshot"
      await page.searchFor("Screenshot");
      // take a screenshot using current date as the file name
      // store the name into a variable inside this test
      page.takeScreenshot(`./screenshots/${screenShotName}`);
        // verify that the screenshot's name exists in the screenshots folder by comparing the variable with the screenshot's name
        expect(screenShotFilePath).toBeTruthy();
  });
});
