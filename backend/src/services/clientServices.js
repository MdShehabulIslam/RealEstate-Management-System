import { query } from "../db.js";

export const getClients = async () => {
  const { rows } = await query("SELECT * FROM clients ORDER BY id ASC");
  return rows;
};

export const createClient = async (clientData) => {
  const {
    name,
    email,
    contact,
    house_no,
    street,
    postal_code,
    rent_amount,
    rent_status,
  } = clientData;
  const { rows } = await query(
    `INSERT INTO clients (name, email, contact, house_no, street, postal_code, rent_amount, rent_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      name,
      email,
      contact,
      house_no,
      street,
      postal_code,
      rent_amount,
      rent_status,
    ]
  );

  return rows[0];
};

export const updateClient = async (clientId, clientData) => {
  const {
    name,
    email,
    contact,
    house_no,
    street,
    postal_code,
    rent_amount,
    rent_status,
  } = clientData;

  const { rows } = await query(
    `UPDATE clients SET name = $1, email = $2, contact = $3, house_no = $4, street = $5, postal_code = $6, rent_amount = $7, rent_status = $8
       WHERE id = $9 RETURNING *`,
    [
      name,
      email,
      contact,
      house_no,
      street,
      postal_code,
      rent_amount,
      rent_status,
      clientId,
    ]
  );

  return rows[0];
};

export const deleteClient = async (clientId) => {
  const { rowCount } = await query(`DELETE FROM clients WHERE id = $1`, [
    clientId,
  ]);
  return rowCount > 0;
};

export const searchClients = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM clients WHERE name ILIKE $1 OR email ILIKE $1 OR contact ILIKE $1 OR house_no ILIKE $1 OR street ILIKE $1 OR postal_code ILIKE $1 OR rent_status ILIKE $1`,
    [`%${searchTerm}%`]
  );
  return rows;
};
