INSERT INTO department (department_name)
VALUES
  ('Tech'),
  ('Marketing'),
  ('Finance'),
  ('Sales'),
  ('Engineering'),
  ('Legal');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Manager ', 2000000, 1),
  ('Marketer', 3000000, 3),
  ('Software Engineer', 40000000, 2),
  ('Attorney', 2000000, 7),
  ('Salesperson', 1300000, 5),
  ('Engineer', 1500000, 6),
  ('Accountant', 1600000, 7),
  ('Sales Lead', 1600053450, 5),
  ('CEO', 400345000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ron', 'bank', 1, 1),
  ('Shawn', 'Wolf', 2, 2),
  ('Jordan', 'Chill', 3, 1),
  ('Octavia', 'Butler', 4, 3),
  ('John', 'Doe', 5, 1),
  ('Tom', 'Allen', 6, 3);