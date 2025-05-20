# Event Management API

## Description

A robust backend API for managing events, bookings, and user authentication. This system allows users to discover events, make bookings, and manage their profiles, while organizers can create and manage events. Built with Node.js, Express, and MongoDB.

## Key Features

- **User Authentication**: Secure JWT-based auth with role-based access control
- **Event Management**: Create, read, update, and delete events with image uploads
- **Booking System**: Users can book tickets for events
- **Role-Based Permissions**: Adminand and User roles with granular permissions
- **Search & Filtering**: Advanced event search with pagination

## Technologies

- **Backend**: Spring Boot, Spring Security, Spring JPA
- **Database**: MYSQL 
- **Authentication**: JWT

## API Base URL

The API is deployed on loclaly and can be accessed at:  
**`localhost:8080`**

### Some Example Endpoints:
- **Authentication**:  
  `POST localhost:8080/auth/signin`  
  `POST localhost:8080/auth/signin`

- **Events**:  
  `GET localhost:8080/events`  
  `POST localhost:8080/events`
  `PUT localhost:8080/events`    
  `DELETE localhost:8080/events`  
- **Bookings**:  
  `POST localhost:8080/{userId}/liked/{eventId}`
  `POST localhost:8080/{userId}/booked/{eventId}` 
  `GET localhost:8080/{userId}/booked` 
  `GET localhost:8080/{userId}/liked` 

## Installation for local setup 

1. Clone the repository:

   ```bash
   git clone https://github.com/Sian1902/ATC_01122232149/tree/main/backend
   ```


3. Setup properties file:
   
   ```properties
    spring.application.name=event-management 
    spring.datasource.url=jdbc:mysql://localhost:3306/event_management?createDatabaseIfNotExist=true
    spring.datasource.username=(your mysql username)
    spring.datasource.password=(your mysql password)
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
    spring.jpa.hibernate.ddl-auto=update
    
    # JWT configuration
    jwt.secret=OKWiaG18PT5DV9JDP59SuX+KS7TwOfvtKuT9diQFN9afCOPD+mfMbUhm4jz5I9CNS42ArzXomA1DX4F5OEhtYA==
    
    jwt.expirationMs=10800000                                                          
   ```
4. run the project on intellih then run this script 
  ```sql
  -- Drop existing tables if they exist
  DROP TABLE IF EXISTS user_liked_events;
  DROP TABLE IF EXISTS user_booked_events;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS events;
  DROP TABLE IF EXISTS categories;
  
  -- Create the users table
  CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL
  );
  
  -- Create the categories table
  CREATE TABLE categories (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE
  );
  
  -- Create the events table
  CREATE TABLE events (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category_id INT,
      date DATE,
      venue VARCHAR(255),
      price FLOAT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
  );
  
  -- Create the user_booked_events join table
  CREATE TABLE user_booked_events (
      user_id INT,
      event_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
  );
  
  -- Create the user_liked_events join table
  CREATE TABLE user_liked_events (
      user_id INT,
      event_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
  );
  
  -- Insert sample categories
  INSERT INTO categories (name) VALUES ('Music'), ('Tech'), ('Art');
  
  -- Insert sample events
  INSERT INTO events (name, description, category_id, date, venue, price) VALUES
  ('Rock Festival', 'Annual rock concert.', 1, '2025-08-15', 'Stadium A', 50.0),
  ('AI Conference', 'Latest trends in AI.', 2, '2025-09-10', 'Tech Center', 120.0),
  ('Art Exhibition', 'Modern art gallery.', 3, '2025-07-20', 'Gallery Hall', 30.0);
  
  -- Insert sample users
  -- Assume passwords are already bcrypt-hashed
  INSERT INTO users (email, password, role, name) VALUES
  ('john@example.com', '$2a$10$exampleHashedPwd1', 'USER', 'John Doe'),
  ('admin@example.com', '$2a$10$exampleHashedPwd2', 'ADMIN', 'Admin User');
  
  -- Associate events to users via booked and liked
  INSERT INTO user_booked_events (user_id, event_id) VALUES
  (1, 1), (1, 2);  -- John booked Rock Festival and AI Conference
  
  INSERT INTO user_liked_events (user_id, event_id) VALUES
  (1, 3), (2, 1);  -- John liked Art Exhibition, Admin liked Rock Festival

  ```



## Security

- JWT authentication with HTTP-only cookies
- Role-based access control
- Input validation for all endpoints
- Password hashing
- Secure headers

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)
