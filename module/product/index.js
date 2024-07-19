import { Router } from "express";
import {
  addData,
  deleteData,
  getAllData,
  getData,
  updateData,
} from "./product.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const resp = await getAllData();
    if (resp.status) {
      res.status(200).json(resp);
    } else {
      throw resp.error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await getData(id);
    if (resp.status) {
      res.status(200).json(resp);
    } else {
      throw resp.error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    console.log(name, description, price);
    const resp = await addData(name, description, price);
    if (resp.status) {
      res.status(200).json(resp);
    } else {
      throw resp.error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price } = req.query;
    console.log(name, description, price);
    const resp = await updateData(name, description, price, id);
    if (resp.status) {
      res.status(200).json(resp);
    } else {
      throw resp.error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await deleteData(id);
    if (resp.status) {
      res.status(204).json(resp);
    } else {
      throw resp.error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error,
      status: false,
    });
  }
});

export default router;
