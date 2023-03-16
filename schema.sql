CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    title TEXT,
    describe TEXT,
    image_url TEXT,
    price integer,
    available integer

);

CREATE TABLE users(
    id SERIAL PRIMARY key,
    email TEXT,
    password_digest TEXT,
    address TEXT,
    credit integer,
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    customer_id integer

);

CREATE TABLE order_items(

    orders_id integer,
    customer_id integer,
    item_id integer
    
);

select * from order_items join items on order_items.item_id= items.id where order_items.orders_id = orderid




insert into users (email, password_digest, address, credit) values ('admin', 'admin', 'sydney', 1000);

insert into users (email, password_digest, address, credit) values ('user1', 'user1', 'sydney', 100);


insert into orders (order_type, customer_id, item_id, item_quantity) values ('B', '1', '3', 2);