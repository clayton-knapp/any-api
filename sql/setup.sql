-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cats;

CREATE TABLE cats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  age INT NOT NULL CHECK (age > -1),
  favorite_toy TEXT
);

INSERT INTO
  cats (name, owner, age, favorite_toy)
VALUES
  ('Sterling', 'Clayton', 14, 'feather'),
  ('Ernie', 'Olivia', 13, 'ball');