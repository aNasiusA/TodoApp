CREATE DATABASE todo_app_simple;
USE todo_app_simple;

CREATE TABLE tasks (
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (description) 
VALUES 
('Create a responsive homepage layout.'),
('Schedule automatic backups for the database.'),
('Resolve issue causing server crashes.'),
('Prepare user guide for the project.'),
('Review pull requests from team members.'),
('Organize a team meeting to discuss project status.'),
('Upgrade project dependencies to latest versions.'),
('Collect and analyze user feedback for the latest release.');