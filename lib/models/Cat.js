const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  owner;
  age;
  favoriteToy;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.owner = row.owner;
    this.age = row.age;
    this.favoriteToy = row.favorite_toy;
  }

  //define methods here

  //CRUD methods/functions
  static async insert({ name, owner, age, favoriteToy }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        cats (name, owner, age, favorite_toy)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [name, owner, age, favoriteToy]
    );

    console.log(rows[0]);

    return new Cat(rows[0]);
  }

  static async fetchAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        cats
      `
    );

    // console.log(rows);

    return rows.map((row) => new Cat(row));
  }

};
