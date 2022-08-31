/** @format */

import express, { query } from "express"
import { Op } from "sequelize"
import Product from "./model.js"

const productRouter = express.Router()

productRouter.get("/", async (req, res, next) => {
  try {
    const query = {}
    if (req.query.name) {
      query.name = {
        [Op.iLike]: `%${req.query.name}%`,
      }
    }
    if (req.query.price) {
      query.price = {
        [Op.between]: req.query.price.split(","),
      }
    }
    if (req.query.category) {
      query.category = {
        [Op.iLike]: `%${req.query.category}%`,
      }
    }
    const products = await Product.findAll({
      attributes: ["name", "category", "price", "description", "image"],
      where: query,
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body)

    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.send({ rows: result })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default productRouter
