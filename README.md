# 📧 Google AI Email & Calendar Assistant

This is a Node.js backend application that integrates with Google Gmail and Calendar, using Gemini AI to provide smart replies and extract event details from emails.

---

## ✨ Features

* **Authentication:** Securely connect to a user's Google account using OAuth 2.0.
* **Gmail Integration:**
    * List the user's latest emails.
    * Send emails on the user's behalf.
* **Calendar Integration:**
    * Create new calendar events.
* **AI-Powered Assistance:**
    * Generate smart reply suggestions for any email.
    * Automatically extract event details (title, date, time, participants) from an email body.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Google APIs:** `googleapis` (Gmail API, Calendar API)
* **Authentication:** `google-auth-library` (OAuth 2.0)
* **AI:** `@google/generative-ai` (Gemini 1.5 Flash)
* **Environment:** `dotenv`

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Prerequisites

* Node.js and npm installed.
* A Google Cloud Platform project with the **Gmail API** and **Calendar API** enabled.
* OAuth 2.0 credentials (`Client ID` and `Client Secret`).
* A Gemini API Key.

### 2. Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root of the project and add your credentials:
    ```env
    GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=your_client_secret
    REDIRECT_URI=http://localhost:5000/auth/callback
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Start the server:**
    ```bash
    npm run devStart
    ```
    The server will be running at `http://localhost:5000`.

---

## 🔑 Authentication Flow

Before using the API endpoints, you must authenticate.

1.  Make sure the server is running.
2.  Open your web browser and navigate to:
    **`http://localhost:5000/auth/google`**
3.  Log in with your Google account and grant the requested permissions.
4.  You will be redirected back and see a success message. Your server now has the necessary tokens to make API calls. **You must repeat this step every time you restart the server.**

---

## 🔗 API Endpoints

Here are the available endpoints. All requests should be sent to `http://localhost:5000`.

### **Gmail**

#### 1. List Messages

* **Endpoint:** `GET /gmail/messages`
* **Description:** Fetches a list of the most recent emails from the authenticated user's inbox.
* **Request Body:** None.
* **Success Response:**
    ```json
    [
      {
        "id": "19a2b3c4d5e6f7g8",
        "threadId": "19a2b3c4d5e6f7g8",
        "snippet": "This is a test email snippet..."
      }
    ]
    ```
    [Screenshot of Postman request for listing messages]

#### 2. Send Email

* **Endpoint:** `POST /gmail/send`
* **Description:** Sends an email from the authenticated user's account.
* **Request Body:**
    ```json
    {
      "to": "recipient@example.com",
      "subject": "Hello from my API",
      "body": "This email was sent automatically using the Gmail API."
    }
    ```
* **Success Response:**
    ```
    "Email sent successfully!"
    ```
    [Screenshot of Postman request for sending an email]

---

### **Calendar**

#### 1. Add Calendar Event

* **Endpoint:** `POST /calendar/add`
* **Description:** Creates a new event in the user's primary calendar.
* **Request Body:**
    ```json
    {
      "title": "Team Meeting",
      "date": "2025-09-22",
      "time": "14:00",
      "participants": ["colleague@example.com"]
    }
    ```
* **Success Response:** A JSON object representing the created calendar event.
    [Screenshot of Postman request for adding a calendar event]

---

### **AI Assistant**

#### 1. Get Reply Suggestions

* **Endpoint:** `POST /ai/reply`
* **Description:** Generates 3 smart reply suggestions for a given email body.
* **Request Body:**
    ```json
    {
      "emailBody": "Hi, are you available for a quick call tomorrow at 10 AM to discuss the project update?"
    }
    ```
* **Success Response:**
    ```json
    {
      "suggestions": "1. Yes, 10 AM tomorrow works for me. Looking forward to it.\n2. I'm available then. I'll send a calendar invite shortly.\n3. I have a conflict at that time. Would 11 AM work instead?"
    }
    ```
    [Screenshot of Postman request for AI reply suggestions]

#### 2. Extract Event from Email

* **Endpoint:** `POST /ai/extract-event`
* **Description:** Parses an email body to extract structured event details.
* **Request Body:**
    ```json
    {
      "emailText": "Let's have our weekly sync tomorrow, Sept 22nd, at 3 PM. Alex (alex@example.com) will be joining."
    }
    ```
* **Success Response:**
    ```json
    {
      "event": {
        "title": "Weekly Sync",
        "date": "2025-09-22",
        "time": "15:00",
        "participants": ["alex@example.com"]
      }
    }
    ```
    [Screenshot of Postman request for AI event extraction]