# Questionnaire System

This project is a web-based questionnaire system that allows users to create, manage, and answer questionnaires. It features user authentication, questionnaire creation, and a scoring system.

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/your-username/questionnaire-system.git
   cd questionnaire-system
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up MongoDB:

   - Create a MongoDB Atlas account or use a local MongoDB instance
   - Obtain your MongoDB connection URI

4. Configure the application:

   - Open `server.js`
   - Replace the placeholder MongoDB URI with your actual URI:
     ```javascript
     const server = "your_mongodb_uri_here";
     ```

5. Start the application:

   ```
   npm run start
   ```

6. Access the application in your web browser at `http://localhost:8000`

## Project Overview

The Questionnaire System is designed to facilitate the creation and management of questionnaires. Here's a brief overview of its functionality:

1. **User Registration and Authentication**

   - New users can register with their email, password, and additional details
   - Registered users can log in to access the system

2. **Questionnaire Creation**

   - Authenticated users can create new questionnaires
   - Each questionnaire can have multiple questions
   - Questions can have multiple choice answers
   - Creators can set the correct answer and assign weights to questions

3. **Answering Questionnaires**

   - Users (both registered and guests) can answer published questionnaires
   - The system presents questions one by one
   - Users select their answers from the provided options

4. **Scoring System**

   - After completing a questionnaire, the system calculates the user's score
   - Scores are based on correct answers and question weights
   - The final score is displayed to the user in an alert

5. **Dashboard**
   - Authenticated users have access to a dashboard
   - The dashboard displays a list of questionnaires created by the user
   - Users can view, edit, or delete their questionnaires from the dashboard

## Usage Flow

1. Register a new account or log in if you already have one
2. After logging in, you'll be directed to the dashboard
3. Create a new questionnaire by clicking the "Create Questionnaire" button
4. Add questions, possible answers, correct answers, and weights to your questionnaire
5. Save the questionnaire
6. Share the questionnaire link with others
7. Users can access the questionnaire link, answer the questions, and receive their score (uncompleted)

Enjoy using the Questionnaire System!
"# Kito-questionaire" 
