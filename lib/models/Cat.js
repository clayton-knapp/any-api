const pool = require('..utils/pool');

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
    this.favoriteToy = row.favorite_Toy;
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

    return new Cat(rows[0]);
  }

};
