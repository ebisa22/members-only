# Members Only

A private messaging application built with Node.js, Express, EJS, and PostgreSQL. Users can create accounts, join the club, and participate in discussions. Membership determines which message details are visible, while administrators have additional privileges.

## Features

- User registration and authentication.
- Password hashing with bcryptjs.
- Security-question-based password recovery.
- Membership and admin registration using secret passcodes.
- Create and view messages.
- Visitors can view messages without seeing author information.
- Members can see message authors and timestamps.
- Administrators can delete messages.
- PostgreSQL-backed session management.
- Server-side form validation.

## Technologies

- Node.js
- Express 5
- EJS
- PostgreSQL
- Passport.js and Passport Local
- bcryptjs
- Express Validator
- express-session and connect-pg-simple

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ebisa22/members-only.git
   ```

2. Navigate to the project directory:

   ```bash
   cd members-only
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=your_database_connection_string
   SESSION_SECRET=your_session_secret
   MEMBER_PASSWORD=your_membership_passcode
   ADMIN_PASSWORD=your_admin_passcode
   ```

5. Set up your PostgreSQL database using the project's schema.

6. Seed the database if needed:

   ```bash
   npm run db:seed
   ```

### Running the Application

Start the application:

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the application |
| `npm run dev` | Starts the application in watch mode |
| `npm run db:seed` | Runs the database seed script |

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Session signing secret |
| `MEMBER_PASSWORD` | Membership passcode |
| `ADMIN_PASSWORD` | Administrator passcode |

## License

This project is licensed under the ISC License.