import pg from "pg";
import env from "dotenv";

env.config();

const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } = process.env;

// Check if all required environment variables are set
if (!PG_USER || !PG_HOST || !PG_DATABASE || !PG_PASSWORD || !PG_PORT) {
  console.error('Missing required database environment variables');
  console.error('Required variables:', {
    PG_USER: !!PG_USER,
    PG_HOST: !!PG_HOST,
    PG_DATABASE: !!PG_DATABASE,
    PG_PASSWORD: !!PG_PASSWORD,
    PG_PORT: !!PG_PORT
  });
  process.exit(1);
}

const db = new pg.Client({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
});

// Connect with error handling
try {
  await db.connect();
  console.log('Successfully connected to PostgreSQL database');
} catch (err) {
  console.error('Error connecting to the database:', err);
  process.exit(1);
}

db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(1);
});

db.on("end", () => {
  console.log("Client has disconnected");
});

export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await db.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};
