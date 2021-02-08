const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "!/%r)d3unTS9[;[#",
  host: "localhost",
  port: 5000,
  database: "savepoint",
});

module.exports = pool;
