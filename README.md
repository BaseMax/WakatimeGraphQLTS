## Wakatime Clone GraphQL-based Webservice TS

This project is a Wakatime clone developed as a GraphQL-based webservice using TypeScript and NestJS. It aims to provide time tracking and productivity analysis for developers by integrating with various code editors and providing insightful reports on their coding activity.


## Features

- **User Authentication: Users can sign up, log in, and manage their accounts. Authentication is required to access certain features and user-specific data.
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
``

**Access the webservice:**

The webservice will be accessible at `http://localhost:<PORT>/graphql`, where `<PORT>` is the port specified in your `.env` file or the default port.

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
