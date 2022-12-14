/** @format */

import sequelize from "../../db/index.js"
import { DataTypes } from "sequelize"

const ProductCategory = sequelize.define("productCategory", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
})

export default ProductCategory
