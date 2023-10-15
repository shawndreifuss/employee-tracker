INSERT INTO department (name)
VALUES
  ('HR'),
  ('Tech'),
  ('Marketing'),
  ('Finance'),
  ('Sales'),
  ('Engineering'),
  ('Legal');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Recruiter ', 20000, 1),
  ('Marketer', 30000, 3),
  ('Software Engineer', 40000, 2),
  ('Attorney', 200000, 7),
  ('Salesperson', 130000, 5),
  ('Engineer', 150000, 6),
  ('Accountant', 160000, 7),
  ('CFO', 160000, 5),
  ('CEO', 400000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Taylor', 'Gardner', 1, 1),
  ('Virginia', 'Woolf', 2, 2),
  ('Unica', 'Zurn', 3, 1),
  ('Octavia', 'Butler', 4, 3),
  ('Shawn ', 'Dreifuss', 9, 5),
  ('Jordan', 'Chillinsky', 8, 5);