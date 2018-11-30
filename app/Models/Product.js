"use strict";

const Model = use("Model");

class Product extends Model {
  orders() {
    return this.belongsToMany("App/Models/Order")
      .withPivot(["quantity", "price", "discount"])
      .pivotModel("App/Models/OrderProduct");
  }
}

module.exports = Product;
