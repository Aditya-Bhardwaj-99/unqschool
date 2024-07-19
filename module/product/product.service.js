import sql from "../sql/sql.js";

const connection = new sql("shop", "localhost", "root", "root");

export const getAllData = async () => {
  try {
    const data = await connection.getAllProducts();
    if (data.status) {
      return { status: true, data: data.data };
    } else {
      throw data.error;
    }
  } catch (error) {
    return { status: false, message: error.message, error: error };
  }
};

export const getData = async (id) => {
  try {
    const data = await connection.getProduct(id);
    if (data.status) {
      return { status: true, data: data.data };
    } else {
      throw data.error;
    }
  } catch (error) {
    return { status: false, message: error.message, error: error };
  }
};

export const addData = async (name, description, price) => {
  try {
    const data = await connection.addProduct(name, description, price);
    console.log(data);
    if (data.status) {
      return { status: true, data: data.data };
    } else {
      throw data.error;
    }
  } catch (error) {
    return { status: false, message: error.message, error: error };
  }
};

export const updateData = async (name, description, price, id) => {
  try {
    const data = await connection.updateProduct(id, name, description, price);
    if (data.status) {
      return { status: true, data: data.data };
    } else {
      throw data.error;
    }
  } catch (error) {
    return { status: false, message: error.message, error: error };
  }
};

export const deleteData = async (id) => {
  try {
    const data = await connection.deleteProduct(id);
    if (data.status) {
      return { status: true, data: data.data };
    } else {
      throw data.error;
    }
  } catch (error) {
    return { status: false, message: error.message, error: error };
  }
};
