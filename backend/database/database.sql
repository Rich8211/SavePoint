CREATE DATABASE savepoint;

-- CREATE TYPE gender as enum
-- ('male', 'female','nonbinary');

CREATE TABLE users
(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    img_url TEXT,
    bio TEXT
);

CREATE TABLE events
(
    event_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL
);



CREATE TABLE rooms
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    price_total INT NOT NULL,
    accommodation_name VARCHAR(50) NOT NULL,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    zipcode INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    other_details TEXT
)

CREATE TABLE requests_has_room
(
    request_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    eventName TEXT NOT NULL,
    eventcity TEXT,
    eventstate TEXT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    price_total INT NOT NULL,
    accommodation_name VARCHAR(50) NOT NULL,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    zipcode INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    other_details TEXT ,
    user_id uuid REFERENCES users (user_id)
);


CREATE TYPE noise AS ENUM ('Social','Quiet');
CREATE TYPE schedule as enum ('Early Riser', 'Night Owl');

CREATE TABLE requests_no_room
(
    request_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    eventname TEXT,
    eventcity TEXT,
    eventstate TEXT,
    pref_check_in_date DATE NOT NULL,
    pref_check_out_date DATE NOT NULL,
    max_roommates INT NOT NULL,
    budget INT NOT NULL,
    noise noise,
    schedule schedule,
    other_details TEXT,
    user_id uuid REFERENCES users (user_id)
);

CREATE TABLE user_requests
(
    request_id BIGINT REFERENCES (request_id),
    user_id BIGINT REFERENCES users (user_id),
    has_room BOOLEAN
)