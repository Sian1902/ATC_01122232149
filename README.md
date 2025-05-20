# Event Sync - ATC_01122232149

**Event Sync** is a complete event management solution featuring an **Angular frontend** and **Spring Boot backend API**.  
The platform enables users to discover, book, and manage events, while organizers and admins can manage listings, bookings, and users through an intuitive dashboard.


## 🛠 Technologies Used

- **Frontend**: Angular, Boot Strap, Router
- **Backend**: Spring Boot, Spring JPA, Spring Security, My SQL

---

## ⚙️ Local Installation

Clone the main repository:

```bash
git clone https://github.com/Sian1902/ATC_01122232149.git
```

## 🔁 Backend Setup
### 📁 Check the backend repo for more details: [Backend](https://github.com/Sian1902/ATC_01122232149/tree/main/backend)

### 📝 in properties file
```properties
spring.application.name=event-management 
spring.datasource.url=jdbc:mysql://localhost:3306/event_management?createDatabaseIfNotExist=true
spring.datasource.username=(your user name in mysql )
spring.datasource.password=(your password in mysql )
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update

# JWT configuration
jwt.secret=OKWiaG18PT5DV9JDP59SuX+KS7TwOfvtKuT9diQFN9afCOPD+mfMbUhm4jz5I9CNS42ArzXomA1DX4F5OEhtYA==

jwt.expirationMs=10800000
```
note: the port is by default 8080
### ▶️ Start the backend:
after setting the properties file correctly all you need is running the project on intellij

## 🌐 Frontend Setup
### 📁 Check the frontend repo: eventhub-website
```bash
git clone https://github.com/Sian1902/ATC_01122232149/tree/main/frontend
ng g s -o 
```
note: make sure the backend is running on port 8080
then visit localhost:4200 to access the frontend
### ✅ You can now test your frontend with the local backend

## 📸 Screenshots

![Home Page](https://github.com/user-attachments/assets/9d83a0f2-2aa1-4007-a141-9b4b9d23e0de)

![Event Page](https://github.com/user-attachments/assets/0cbaa377-b7e9-48a4-af0e-7c6f22d07429)

![SignIn](https://github.com/user-attachments/assets/3245f9f3-ae98-4f35-8acd-9114f1121251)

![SignUp](https://github.com/user-attachments/assets/f09ae24f-1052-43da-9fa5-c046c841ee70)


## 🤝 Contributions
### Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License
### MIT License — feel free to use and modify!
