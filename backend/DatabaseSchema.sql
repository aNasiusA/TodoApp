CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE tasks (
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, priority) 
VALUES 
('Design Homepage', 'Create a responsive homepage layout.', 'pending', 'high'),
('Database Backup', 'Schedule automatic backups for the database.', 'in-progress', 'medium'),
('Bug Fix #123', 'Resolve issue causing server crashes.', 'completed', 'high'),
('Write Documentation', 'Prepare user guide for the project.', 'pending', 'low'),
('Code Review', 'Review pull requests from team members.', 'in-progress', 'medium'),
('Team Meeting', 'Organize a team meeting to discuss project status.', 'completed', 'low'),
('Update Dependencies', 'Upgrade project dependencies to latest versions.', 'pending', 'medium'),
('User Feedback', 'Collect and analyze user feedback for the latest release.', 'pending', 'high');
