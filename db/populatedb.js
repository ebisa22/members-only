import { Client } from "pg";

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        security_question VARCHAR(255) NOT NULL,
        security_answer VARCHAR(255) NOT NULL,
        is_member BOOLEAN NOT NULL DEFAULT FALSE,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE
    );
`;
const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
        message_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        text TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
`;

const createSessionTable = `
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;
const main = async () => {
  const database_url = process.argv[2] || process.env.DATABASE_URL;
  if (!database_url) throw new Error("database url is missing");

  const client = new Client({
    connectionString: database_url,
  });
  try {
    console.log("seeding...");
    await client.connect();
    await client.query(createUsersTable);
    await client.query(createMessagesTable);
    await client.query(createSessionTable);
    await client.end();
    console.log("done");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

main();
