import { Router } from "express";
import productRouter from "../module/product/index.js";

const route = Router()

route.use("/products",productRouter)

export default route