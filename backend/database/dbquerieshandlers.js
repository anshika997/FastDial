const db = require("./db");

// Column name validation — prevent SQL injection via user-controlled keys
function isValidColumnName(name) {
  return /^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/.test(name);
}

async function getData(req, res, viewName) {
  try {
    const queryParams = req.query || {};
    const inputParameters = [];
    const whereConditions = [];

    // Construct query conditions and parameters
    function isDate(value) {
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    }

    // Construct query conditions and parameters
    // Skip 'orderby' as it's handled separately
    Object.entries(queryParams).forEach(([key, value], index) => {
      if (key === "orderby") return; // handled below

      // SECURITY: Validate column names to prevent SQL injection
      if (!isValidColumnName(key)) {
        throw new Error(`Invalid column name: ${key}`);
      }

      if (isDate(value)) {
        // Use DATE() for date values
        whereConditions.push(`DATE(\`${key}\`) = ?`);
      } else {
        whereConditions.push(`\`${key}\` = ?`);
      }
      inputParameters.push(value);
    });

    // Construct the SQL query
    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // SECURITY: Validate orderby column name
    let orderByClause = "";
    if (req.query.orderby && isValidColumnName(req.query.orderby)) {
      orderByClause = `ORDER BY \`${req.query.orderby}\` DESC`;
    }

    const sqlQuery = `SELECT * FROM ${viewName}  ${whereClause} ${orderByClause}`;

    console.log(sqlQuery); // For debugging

    // Execute query
    const result = await db(sqlQuery, inputParameters);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Internal server error!" });
    console.error(err);
  }
}

module.exports = getData;
