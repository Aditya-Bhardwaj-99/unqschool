import { createConnection } from "mysql2/promise";

export default class sql {
  database = "";
  user = "";
  password = "";
  connection = "";
  host = "";

  constructor(db, host, user = null, pass = null) {
    this.database = db;
    this.host = host;
    this.user = process.env.db_user || user;
    this.password = process.env.db_password || pass;
  }

  connect = async () => {
    try {
      const connection = await createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
      });
      this.connection = connection;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getAllProducts = async () => {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const query = "SELECT * FROM products";

      const [res] = await this.connection.query(query);

      return { status: true, data: res };
    } catch (error) {
      console.log(error);
      return { status: false, data: error.message, error: error };
    }
  };

  getProduct = async (id) => {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const query = "SELECT * FROM products WHERE `id` = ?";

      const [res] = await this.connection.query(query, [id]);

      return { status: true, data: res };
    } catch (error) {
      console.log(error);
      return { status: false, data: error.message, error: error };
    }
  };

  addProduct = async (name, description, price) => {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const query =
        "INSERT INTO products(`name`,`description`,`price`) VALUES(?,?,?)";

      const [res] = await this.connection.query(query, [
        name,
        description,
        price,
      ]);
      return { status: true, data: "Data Added" };
    } catch (error) {
      console.log(error);
      return { status: false, data: error.message, error: error };
    }
  };

  updateProduct = async (id, name = null, description = null, price = null) => {
    try {
      if (!this.connection) {
        await this.connect();
      }
      let updates = [];
      let ops = [];
      if (!name && !description && !price) {
        return {
          status: false,
          data: "No data to update",
          error: new Error("No data to update"),
        };
      }
      if (name) {
        updates.push("`name`=?");
        ops.push(name);
      }
      if (description) {
        updates.push("`description`=?");
        ops.push(description);
      }
      if (price) {
        updates.push("`price`=?");
        ops.push(price);
      }
      const query =
        "UPDATE products SET " + updates.join(",") + " WHERE `id`= ?";

      console.log(name, description, price, id);
      ops.push(id);

      const [res] = await this.connection.query(query, ops);

      return { status: true, data: "Data Updated" };
    } catch (error) {
      console.log(error);
      return { status: false, data: error.message, error: error };
    }
  };
  deleteProduct = async (id) => {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const query = "DELETE FROM products WHERE `id` = ?";

      const [res, meta] = await this.connection.query(query, [id]);

      return { status: true, data: "Data Deleted", meta: meta };
    } catch (error) {
      console.log(error);
      return { status: false, data: error.message, error: error };
    }
  };
}
