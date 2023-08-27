## Wakatime Clone GraphQL-based Webservice TS

This project is a Wakatime clone developed as a GraphQL-based webservice using TypeScript and NestJS. It aims to provide time tracking and productivity analysis for developers by integrating with various code editors and providing insightful reports on their coding activity.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts. Authentication is required to access certain features and user-specific data.
- **Editor Plugin Integration**: The webservice will support integrating with various code editors, allowing users to track their coding activity automatically.
- **Time Tracking**: Users' coding activity, including time spent on projects, files, and languages, will be recorded and available for analysis.
- **Dashboard**: Users will have access to a personalized dashboard displaying their coding statistics, such as total coding time, most used programming languages, and productivity trends.
- **Reports**: Users can generate detailed reports based on specific time periods, projects, or languages. These reports will help users analyze their productivity and coding habits.
- **API Key Management**: Users will have API keys that can be used to authenticate requests to the webservice for integration with other tools and services.
- **Leaderboard**: A leaderboard will be available to compare users' coding activity and productivity with others on the platform.
- **Notifications**: Users can receive notifications based on their coding activity, achievements, or other relevant events.
- **Settings**: Users can customize various settings, including privacy preferences, notification preferences, and integration options.
- **Analytics**: The webservice will provide data analytics and insights on coding patterns, productivity trends, and other relevant metrics.

## Tech Stack

The project will be developed using the following technologies:

- TypeScript: The primary programming language for the backend and frontend (if applicable).
- NestJS: A Node.js framework for building scalable and efficient server-side applications.
- GraphQL: A query language for APIs, allowing clients to request exactly the data they need.
- TypeORM: An Object-Relational Mapping (ORM) library for TypeScript that simplifies database operations.
- PostgreSQL: A powerful open-source relational database.

## Getting Started

To run this project locally, follow these steps:

**Clone the repository:**

```bash
git clone https://github.com/basemax/WakatimeGraphQLTS.git
cd WakatimeGraphQLTS
```

**Install dependencies:**

```
npm install
```

**Set up the database:**

Make sure you have PostgreSQL installed and running. Create a new database for the project and update the database configuration in the `.env` file.

**Set environment variables:**

Create a `.env` file based on the .env.example file and set the required environment variables.

Build and run the project:

```
npm run build
npm run start
```

**Access the webservice:**

The webservice will be accessible at `http://localhost:<PORT>/graphql`, where `<PORT>` is the port specified in your `.env` file or the default port.

## GraphQL

**Queries:**

- `getUserProfile` - Get the details of the authenticated user's profile.
- `getUserCodingActivity(startDate: String!, endDate: String!)` - Get the coding activity of the authenticated user for a specific time period.
- `getProjectDetails(projectID: ID!)` - Get details of a specific project.
- `getProjects` - Get a list of all projects for the authenticated user.
- `getAPIKey` - Get the API key of the authenticated user.
- `checkAPIKeyValidity(apiKey: String!)` - Check the validity of an API key.
- `getEditorData(editorID: ID!)` - Get data from a specific code editor.
- `getEditorDataByDate(editorID: ID!, date: String!)` - Get data from a specific code editor for a particular date.

**Mutations:**

- `signUp(username: String!, email: String!, password: String!)` - Register a new user.
- `logIn(email: String!, password: String!)` - Log in an existing user.
- `logOut` - Log out the authenticated user.
- `updateProfile(username: String, email: String, avatar: String)` - Update the user's profile details.
- `createAPIKey` - Generate a new API key for the authenticated user.
- `deleteAPIKey(apiKeyID: ID!)` - Delete an API key for the authenticated user.
- `trackCodingActivity(projectID: ID!, language: String!, file: String!, startTime: String!, endTime: String!)` - Track coding activity for the authenticated user.
- `generateReport(startDate: String!, endDate: String!)` - Generate a coding activity report for a specific time period.
- `setNotificationPreferences(notifications: [String]!)` - Set notification preferences for the authenticated user.
- `setIntegrationSettings(editor: String!, apiKey: String!)` - Set integration settings for a code editor.
- `joinLeaderboard` - Join the coding activity leaderboard.
- `leaveLeaderboard` - Leave the coding activity leaderboard.
- `submitFeedback(subject: String!, message: String!)` - Submit feedback to the administrators.
- `deleteAccount(password: String!)` - Delete the authenticated user's account (requires password confirmation).

### Editor-related Mutations:

- `saveEditorData(editorID: ID!, data: JSON!)` - Save editor data in the database for a specific code editor.
- `trackEditorActivity(editorID: ID!)` - Start tracking editor activity for a specific code editor.
- `stopEditorActivity(editorID: ID!)` - Stop tracking editor activity for a specific code editor.
- `updateEditorActivity(editorID: ID!, data: JSON!)` - Update editor activity data for a specific code editor.

### Additional Auth-related Queries:

- `forgotPassword(email: String!)` - Request a password reset link to be sent to the provided email.
- `resetPassword(resetToken: String!, newPassword: String!)` - Reset the password using the reset token received via email.

And more queries, and mutations.

## GraphQL Models

```graphql
type User {
  id: ID!
  username: String!
  email: String!
  password: String! # Note: Password should not be returned by queries for security reasons.
  avatar: String
  createdAt: String!
  updatedAt: String!
  apiKeys: [APIKey!]
  projects: [Project!]
  codingActivity: [CodingActivity!]
  notifications: [String!]
  leaderboardRank: Int
}

type APIKey {
  id: ID!
  key: String!
  createdAt: String!
  updatedAt: String!
}

type Project {
  id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
  contributors: [User!]
  codingActivity: [CodingActivity!]
}

type CodingActivity {
  id: ID!
  user: User!
  project: Project!
  language: String!
  file: String!
  startTime: String!
  endTime: String!
  createdAt: String!
  updatedAt: String!
}

type Query {
  getUserProfile: User!
  getUserCodingActivity(startDate: String!, endDate: String!): [CodingActivity!]
  getProjectDetails(projectID: ID!): Project!
  getProjects: [Project!]
  getAPIKey: APIKey!
  checkAPIKeyValidity(apiKey: String!): Boolean!
  getEditorData(editorID: ID!): JSON!
  getEditorDataByDate(editorID: ID!, date: String!): JSON!
}

type Mutation {
  signUp(username: String!, email: String!, password: String!): User!
  logIn(email: String!, password: String!): User!
  logOut: Boolean!
  updateProfile(username: String, email: String, avatar: String): User!
  createAPIKey: APIKey!
  deleteAPIKey(apiKeyID: ID!): Boolean!
  trackCodingActivity(
    projectID: ID!
    language: String!
    file: String!
    startTime: String!
    endTime: String!
  ): CodingActivity!
  generateReport(startDate: String!, endDate: String!): [CodingActivity!]
  setNotificationPreferences(notifications: [String!]!): User!
  setIntegrationSettings(editor: String!, apiKey: String!): Boolean!
  joinLeaderboard: Boolean!
  leaveLeaderboard: Boolean!
  submitFeedback(subject: String!, message: String!): Boolean!
  deleteAccount(password: String!): Boolean!
  forgotPassword(email: String!): Boolean!
  resetPassword(resetToken: String!, newPassword: String!): Boolean!
  saveEditorData(editorID: ID!, data: JSON!): Boolean!
  trackEditorActivity(editorID: ID!): Boolean!
  stopEditorActivity(editorID: ID!): Boolean!
  updateEditorActivity(editorID: ID!, data: JSON!): Boolean!
}
```

## Contributing

We welcome contributions to improve and enhance this Wakatime clone. To contribute, follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and push them to your fork.
- Create a pull request to the main branch of the original repository.
- Wait for code review and address any feedback.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## Acknowledgments

Wakatime for inspiring this project and providing valuable insights into developers' productivity.

The open-source community for their contributions to the technologies used in this project.

## Contact

If you have any questions or need further assistance, you can contact the project maintainers.

Feel free to open an issue or submit a pull request! Happy coding!

Copyright 2023, Max Base

## GraphQL

| Query/Mutation        | Description                                 | Screenshot                                         |
| --------------------- | ------------------------------------------- | -------------------------------------------------- |
| `sign_up`             | signing up a new user.                      | ![update post](./screenshots/sign_up.jpg)          |
| `login`               | login a new user.                           | ![update post](./screenshots/login.jpg)            |
| `logout`              | loging out a user.                          | ![update post](./screenshots/logout.jpg)           |
| `addMemberToTeam`     | adding a member to a team with ids.         | ![get all tags](./screenshots/addMemberToTeam.jpg) |
| `add to group`        | add a user to a group.                      | ![get all posts](./screenshots/addToGroup.jpg)     |
| `createApiKey`        | creating a api key.                         | ![get post by id](./screenshots/createApiKey.jpg)  |
| `createTeam`          | creating a new team.                        | ![login](./screenshots/createTeam.jpg)             |
| `DeleteApiKey`        | deleting an api key.                        | ![login](./screenshots/DeleteApiKey.jpg)           |
| `getApiKey`           | getting a api key of the logged user.       | ![login](./screenshots/getApiKey.jpg)              |
| `getProjects`         | getting projects of the logged user.        | ![login](./screenshots/getProjects.jpg)            |
| `getTeam`             | getting team of the current logged user.    | ![login](./screenshots/getTeam.jpg)                |
| `getTeams`            | getting teams of the current logged user.   | ![login](./screenshots/GetTeams.jpg)               |
| `getUserProfile`      | getting profile of the current logged user. | ![login](./screenshots/getUserProfile.jpg)         |
| `getusersteams`       | getting all users of a team.                | ![login](./screenshots/getusersteams.jpg)          |
| `trackCodingActivity` | submitting coding activity.                 | ![login](./screenshots/trackCodingActivity.jpg)    |
| `updateTeam`          | updating a team by id.                      | ![login](./screenshots/updateTeam.jpg)             |
