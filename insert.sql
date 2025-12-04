INSERT INTO Users (first_name, last_name, email, password_hash, role)
VALUES ('John', 'Host', 'john@example.com', 'hashedpassword', 'host');

INSERT INTO Events (title, description, location, event_date, posted_by)
VALUES ('Funeral', 'Dead', 'Chapel', '2023-12-31 15:30:45', '1');

INSERT INTO Events (title, description, location, event_date, posted_by)
VALUES ('Wedding', 'Love', 'Vegas', '2023-12-24 15:30:45', '1');

INSERT INTO Registrations (user_id, event_id)
VALUES (1, 4);

INSERT INTO Events (title, description, location, event_date, posted_by)
VALUES ('Halloween', 'Boo', 'Cemetary', '2023-10-31 15:30:45', '1');