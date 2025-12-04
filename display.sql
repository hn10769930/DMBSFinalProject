SELECT Events.*, CONCAT(Users.first_name, ' ', Users.last_name) AS host
FROM Events
JOIN Users ON Events.posted_by = Users.user_id
ORDER BY event_date ASC;

SELECT Events.*, CONCAT(Users.first_name, ' ', Users.last_name) AS host
FROM Events
JOIN Users ON Events.posted_by = Users.user_id
WHERE event_id = 5;

SELECT Events.*
FROM Registrations
JOIN Events ON Registrations.event_id = Events.event_id
WHERE Registrations.user_id = 1;