CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    title TEXT,
    describe TEXT,
    image_url TEXT,
    price integer,
    availabe integer

);

CREATE TABLE users(
    id SERIAL PRIMARY key,
    email TEXT,
    passwotd_digest TEXT,
    address TEXT,
    credit integer,
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    order_type TEXT,
    customer_id integer,
    item_id integer,
    item_quantity integer

);

