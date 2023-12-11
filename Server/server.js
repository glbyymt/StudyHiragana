const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// PostgreSQL接続情報
const pool = new Pool({
  user: 'mojio',
  host: 'localhost',
  database: 'mojistudy',
  password: 'mojio',
  port: 5432,
});

// CORS middleware
app.use(cors());

// APIエンドポイント: ランダムなデータを取得
app.get('/api/getRandomData', async (req, res) => {
  try {
    const mojiID = req.query.mojiID;
    const result = await pool.query('SELECT * FROM tb_mojiStudy WHERE moji_id = $1', [mojiID]);
    res.json(result.rows);
    console.log('Query result:', result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// APIエンドポイント: 指定したItem_IDのデータを取得
app.get('/api/getData', async (req, res) => {
  try {
    const itemID = req.query.itemID;
    const result = await pool.query('SELECT * FROM tb_mojiStudy WHERE item_id = $1', [itemID]);
    res.json(result.rows[0]); // ここでは1つのレコードのみを返すことを仮定しています
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
