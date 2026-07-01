require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function check() {
    try {
        console.log('Connecting to DB...');
        const res = await pool.query(`
            SELECT table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        console.log("Schema:\n", JSON.stringify(res.rows, null, 2));
    } catch (e) {
        console.error('Error connecting or querying DB:', e);
    } finally {
        pool.end();
    }
}
check();
