const pool = require("../../database/db");

const user = {};

user.create = function ({

    email,
    password,
    username,
    bio,
    img_url
    // username,
    // encrypted_password,
    // email,
    // bio,
    // first_name,
    // last_name,
    // img_url,
    // tos,
    // created_on,
}) {
    return pool.query(`
        INSERT INTO users (
            email,
            password,
            username,
            bio,
            img_url
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        ) RETURNING *`, [
        email,
        password,
        username,
        bio,
        img_url
    ])
}

user.find = function (username) {
    return pool.query(`SELECT * FROM users where username = $1`, [username]);
}

user.find_auth = function (id) {
    return pool.query(`SELECT * FROM users where user_id = $1`, [id]);
}

user.addEvent = function ({
    user_id,
    event_id
}) {
    return pool.query(`INSERT INTO event_users (user_id, event_id) VALUES ($1, $2) RETURNING *`,
        [user_id, event_id]);
}

user.create_request_no_room = function ({
    eventname,
    eventcity,
    eventstate,
    pref_check_in_date,
    pref_check_out_date,
    max_roommates,
    budget,
    noise,
    schedule,
    other_details,
    user_id
}) {
    return pool.query(`
        INSERT INTO requests_no_room ( 
            eventname,
            eventcity,
            eventstate,
            pref_check_in_date,
            pref_check_out_date,
            max_roommates,
            budget,
            noise,
            schedule,
            other_details,
            user_id
        ) VALUES ( 
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11
        ) RETURNING *`,
        [
            eventname,
            eventcity,
            eventstate,
            pref_check_in_date,
            pref_check_out_date,
            max_roommates,
            budget,
            noise,
            schedule,
            other_details,
            user_id
        ])
}

user.create_request_w_room = function ({
    eventname,
    eventcity,
    eventstate,
    check_in_date,
    check_out_date,
    price_total,
    accommodation_name,
    address_line_1,
    address_line_2,
    zipcode,
    city,
    state,
    other_details,
    user_id
}) {
    return pool.query(`INSERT INTO requests_has_room (
        eventname,
        eventcity,
        eventstate,
        check_in_date,
        check_out_date,
        price_total,
        accommodation_name,
        address_line_1,
        address_line_2,
        zipcode,
        city,
        state,
        other_details,
        user_id
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14
    ) RETURNING *`, [
        eventname,
        eventcity,
        eventstate,
        check_in_date,
        check_out_date,
        price_total,
        accommodation_name,
        address_line_1,
        address_line_2,
        zipcode,
        city,
        state,
        other_details,
        user_id
    ])
}
user.update_request_w_room = function ({
    eventname,
    eventcity,
    eventstate,
    check_in_date,
    check_out_date,
    price_total,
    accommodation_name,
    address_line_1,
    address_line_2,
    zipcode,
    city,
    state,
    other_details,
    user_id,
    request_id
}) {
    return pool.query(`UPDATE requests_has_room SET 
        eventname = $1,
        eventcity = $2,
        eventstate = $3,
        check_in_date = $4,
        check_out_date = $5,
        price_total = $6,
        accommodation_name =$7,
        address_line_1 = $8,
        address_line_2 = $9,
        zipcode = $10,
        city = $11,
        state = $12,
        other_details = $13
      WHERE request_id = $14`, [
        eventname,
        eventcity,
        eventstate,
        check_in_date,
        check_out_date,
        price_total,
        accommodation_name,
        address_line_1,
        address_line_2,
        zipcode,
        city,
        state,
        other_details,
        request_id
    ])
}

user.find_req_w_room = function (
    user_id
) {
    return pool.query(`SELECT * FROM requests_has_room WHERE user_id = $1`, [user_id])
}
user.find_req_no_room = function (
    user_id
) {
    return pool.query(`SELECT * FROM requests_no_room WHERE user_id = $1`, [user_id])

}

user.find_req_id_w_room = function (
    request_id
) {
    return pool.query(`SELECT * FROM requests_has_room WHERE request_id = $1`, [request_id])
}

user.find_req_id_no_room = function (
    request_id
) {
    return pool.query(`SELECT * FROM requests_no_room WHERE request_id = $1`, [request_id])
}

user.delete_no_room = function (
    request_id
) {
    return pool.query(`DELETE FROM requests_no_room WHERE request_id = $1,`, [request_id])
}
user.delete_has_room = function (
    request_id
) {
    return pool.query(`DELETE FROM requests_has_room WHERE request_id = $1`, [request_id])
}

module.exports = user;