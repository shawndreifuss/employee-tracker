const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express')
const Table = require('console.table');
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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', ], 

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
  const sql = `SELECT role.id, role.title AS Job_Title, role.salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id;`; 
 db.query(sql, (err, result) => {
  if (err) {
    res.status(500).json({ error: err.message})
    return;
  }
  console.table(result);
  startUp()
 });
};

//function view all employees 
function viewAllEmployees() {
  const sql = ` SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) employee_name,
  role.title AS Title,
  department.name AS Department,
  role.salary AS Salary,
  CONCAT (manager.first_name, ' ', manager.last_name) Manager_name
  FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                 ORDER By employee.id;`
 db.query(sql, (err, result) => {
  if (err) {
    res.status(500).json({ error: err.message})
    return;
  }
  console.table(result);
  startUp()
 });
};

//function to add employees
function addEmployee() {
  inquirer.prompt([
      {
          name: "first_name",
          type: "input",
          message: "Please enter the first name of the employee you want to add."
      },
      {
          name: "last_name",
          type: "input",
          message: "Please enter the last name of the employee you want to add."
      },
      {
          name: "role_id",
          type: "number",
          message: "Please enter the role id associated with the employee you want to add, Enter ONLY numbers."
      },
      {
          name: "manager_id",
          type: "number",
          message: "Please enter the manager's id associated with the employee you want to add, Enter ONLY numbers."
      }
  ])
  .then(function(response) {
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
      if (err) throw err;
      console.log('The new employee entered has been added successfully!');

      db.query(`SELECT * FROM employee`, (err, result) => {
          if (err) {
              res.status(500).json({ error: err.message })
              startUp();
          }
          console.table(result);
          startUp();
      });
  })
});
};

 //function to add role 
 function addRole() {
  inquirer.prompt([
      {
          name: "title",
          type: "input",
          message: "Please enter the title of role you want to add to the database."
      },
      {
          name: "salary",
          type: "input",
          message: "Please enter the salary associated with the role you want to add to the database. (no dots, space or commas)"
      },
      {
          name: "department_id",
          type: "number",
          message: "Please enter the department's id associated with the role you want to add to the database."
      }
    ]).then(function (response) {
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
          if (err) throw err;
          console.log('The new role entered has been added successfully to the database.');

          db.query(`SELECT * FROM role`, (err, result) => {
              if (err) {
                  res.status(500).json({ error: err.message })
                  startUp();
              }
              console.table(result);
              startUp();
          });
      })
});
};

function addDepartment() {
  inquirer.prompt([
      {
          name: "department",
          type: "input",
          message: "Please enter the name of the department you want to add to the database."
      }
  ]).then((answer) => {

  const sql = `INSERT INTO department(name)
              VALUES (?)`;
  const params = [answer.department];
  db.query(sql, params, (err, result) => {
  if (err) throw err;
  console.log('The new department entered has been added successfully!');

      db.query(`SELECT * FROM department`, (err, result) => {
          
          console.table(result);
          startUp();
      });
  });
});
};

const updateEmployeeRole = () => {
  db.query('SELECT * FROM employee', (err, employees) => {
      if (err) console.log(err);
      employees = employees.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
          };
      });
      db.query('SELECT * FROM role', (err, roles) => {
          if (err) console.log(err);
          roles = roles.map((role) => {
              return {
                  name: role.title,
                  value: role.id,
              }
          });
          inquirer
              .prompt([
                  {
                      type: 'list',
                      name: 'selectEmployee',
                      message: 'Select employee to update...',
                      choices: employees,
                  },
                  {
                      type: 'list',
                      name: 'selectNewRole',
                      message: 'Select new employee role...',
                      choices: roles,
                  },
              ])
              .then((data) => {
                  db.query('UPDATE employee SET ? WHERE ?',
                      [
                          {
                              role_id: data.selectNewRole,
                          },
                          {
                              id: data.selectEmployee,
                          },
                      ],
                      function (err) {
                          if (err) throw err;
                      }
                  );
                  console.log('Employee role updated');
                  startUp();
              });

      });
  });
};



startUp()