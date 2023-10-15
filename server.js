const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')
const Table = require('console.table')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'shawn020496',
      database: 'employee_db'
    },
    console.log(`Connected to the emplyees_db database.`)
  );

  //promopts user at start up
  function startUp() {
    inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Update An Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee'], 

    }).then( answer => {
        switch (answer.menu) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeRole();
                break;
            case 'Update An Employee Manager':
                updateEmployeeManager();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
        }
    })
 };

//function to view all departments
function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message })
          return;
      }
      console.table(result);
      startUp();
  });
};


//function to view all roles
function viewAllRoles() {
  const sql = `SELECT role.title AS Job_Title, role.salary, department.name AS Department
  FROM role 
  JOIN department ON role.department_id = department.id;`; 
 db.query(sql, (err, result) => {
  if (err) {
    res.status(500).json({ error: err.message})
    return;
  }
  console.table(result);
  startUp()
 });
};



startUp()