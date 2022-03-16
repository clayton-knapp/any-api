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

    // console.log(rows[0]);

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

  static async fetchById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        cats
      WHERE
        id=$1
      `,
      [id]
    );

    // console.log(rows);

    return new Cat(rows[0]);
  }


  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        cats
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Cat(rows[0]);
  }


  static async updateById(id, { name, owner, age, favoriteToy }) {
    const existingCat = await Cat.fetchById(id);
    
    if (!existingCat) return null;
    
    const newName = name ?? existingCat.name;
    const newOwner = owner ?? existingCat.owner;
    const newAge = age ?? existingCat.age;
    const newFavoriteToy = favoriteToy ?? existingCat.favoriteToy;
    
    // console.log(newName, newOwner, newAge, newFavoriteToy);
    const { rows } = await pool.query(
      `
        UPDATE
          cats
        SET
          name=$2,
          owner=$3,
          age=$4,
          favorite_toy=$5
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id, newName, newOwner, newAge, newFavoriteToy]
    );
    
    return new Cat(rows[0]);

  }



};
