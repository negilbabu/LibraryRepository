<h1 align="center">
  Library Repository | Digital Library Management System 📚⚡
</h1>

<p align="center">
  <strong>An enterprise-grade platform featuring real-time communication, bulk data processing, and cloud-integrated notifications.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Angular-14+-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Real--time-WebSockets-005571?style=for-the-badge&logo=socket.io" alt="WebSockets" />
  <img src="https://img.shields.io/badge/Auth-JWT_%26_OAuth2-black?style=for-the-badge&logo=google" alt="Auth" />
</p>

---

## 📖 Project Overview

**Library Repository** is a comprehensive full-stack solution designed for modern educational environments. It manages the complete lifecycle of library resources—from acquisition via bulk CSV uploads to real-time borrowing tracking and user-to-admin communication. The architecture is designed to be event-driven, ensuring users receive instant feedback through WebSockets and push notifications.

## 🚀 Architectural Highlights

### 🛡️ Enterprise Backend (Java / Spring Boot)
The backend follows a **Modular Monolith** structure with a focus on high availability and secure data access.
- **Bi-directional Communication:** Leverages **WebSockets** for real-time messaging and status updates, moving beyond traditional polling.
- **Advanced Security:** Multi-layered authentication including **JWT** for stateless sessions and **OAuth2 (Google Sign-In)** for seamless user onboarding.
- **Bulk Processing Engine:** Custom-built CSV parsing logic (`csvHelper`) to facilitate rapid data ingestion for books and user records.
- **Persistence Layer:** MySQL integration with Hibernate, utilizing optimized JPA repositories for complex borrowing logic (handling fines, availability, and category hierarchies).

### 🎨 Reactive Frontend (Angular)
A high-performance SPA (Single Page Application) built with a focus on responsiveness and state synchronization.
- **Real-time UI:** Integrated **RxJS Observables** to manage live message streams and notification states.
- **Cloud Notifications:** Fully integrated with **OneSignal** and **Firebase** for cross-platform push notifications, even when the browser is inactive.
- **Modular Design:** Clear separation between Admin dashboards and User interfaces to ensure a streamlined UX for different roles.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Usage |
| :--- | :--- | :--- |
| **Backend** | **Java 17 / Spring Boot 3** | Core business logic and API orchestration. |
| **Real-time** | **WebSockets (STOMP/SockJS)** | Live chat and instant borrowing updates. |
| **Frontend** | **Angular** | Component-based UI with TypeScript. |
| **Security** | **JWT & OAuth2** | Secure login and Google integration. |
| **Notifications**| **OneSignal / Firebase** | Push notification delivery infrastructure. |
| **Database** | **MySQL** | Relational data management and indexing. |
| **Data Ingestion**| **OpenCSV / Apache Commons** | Bulk upload and processing of library records. |
| **Testing** | **JUnit & Mockito** | Backend reliability and regression testing. |

---

## ✨ Key Features

### 🏢 Administration & Management
- **Bulk Ingestion:** Upload thousands of book records via CSV in seconds.
- **User Vetting:** Admin approval flows for new registrations.
- **Borrowing Control:** Real-time dashboard to track active borrows and overdue items.
- **Direct Support:** Real-time chat system to assist library members directly.

### 📖 User Experience
- **Smart Discovery:** Search books by category, availability, or title.
- **Personalized Dashboard:** View active borrows, fine history, and receive push notifications for due dates.
- **Google Auth:** One-click registration/login using existing Google accounts.

---

## 🛡️ Engineering Excellence

- **Stateless Architecture:** JWT-based security allows the system to scale horizontally.
- **Clean Code & SOLID:** Strict adherence to interface-based programming in the service layer (`UserService`, `BooksService`, etc.).
- **Global Error Handling:** Centralized `@ControllerAdvice` ensures that even unexpected runtime exceptions are returned as clean, actionable JSON responses.
- **Schema Safety:** Transactional management of complex multi-step processes (like borrowing a book and updating stock simultaneously).

---

## 🚀 Installation & Setup

### Prerequisites
* JDK 17+ & Maven
* Node.js 18+ & Angular CLI
* MySQL 8.x

### Quick Start
1. **Backend:**
   - Navigate to `/BackEnd/Library`.
   - Update `application.properties` with your DB credentials and Google OAuth keys.
   - Run: `./mvnw spring-boot:run`
2. **Frontend:**
   - Navigate to `/FrontEnd/Library`.
   - Run: `npm install`
   - Run: `ng serve`
3. **CSV Template:** Use the sample CSV provided in `/assets` for bulk uploads.

---

## 📈 Future Roadmap
- [ ] **AI Recommendation:** Suggesting books based on borrowing history.
- [ ] **Barcode Integration:** Mobile camera scanning for quick book check-outs.
- [ ] **Dockerization:** Containerizing the stack for easy cloud deployment.

## 📄 License
This project is licensed under the MIT License.
