var express = require('express');
var getConn = require('../database');
var user = express.Router();

/* Logging in user */
user.get('/', async function(req, res, next) {
  if (!req.query.stop_id1 || !req.query.stop_id2) {
    return res.status(400).json({ message: 'Missing email or password.' });
  }
  var conn = await getConn;
  var query = 'SELECT * FROM User WHERE Email = ? AND Password = ?'; //Put Stored Procedure here
  try {
      const rows = await conn.query(query, [req.query.stop_id1, req.query.password.stop_id2]); // example query
      conn.release();
      return res.json(rows[0]);
    } catch (err) {
      console.error(err);
      conn.release();
      return res.status(500).json({ error: 'An error occurred while executing the query.' });
  }
});


module.exports = user;