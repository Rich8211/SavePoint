const pool = require("../../database/db");

const event = {};

event.create = function ({
    name,
    description,
    start_date,
    end_date,
    city,
    state
}) {
    return pool.query(`
                INSERT INTO events (
                    name,
                    description,
                    start_date,
                    end_date,
                    city,
                    state
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                ) RETURNING *`, [
        name,
        description,
        start_date,
        end_date,
        city,
        state
    ])
};

event.get_names = function ({}) {
    return pool.query(`SELECT name FROM events`)
}

event.get = function ({
    name
}) {
    return pool.query(`SELECT * FROM events WHERE name = $1`, [name])
}

module.exports = event;