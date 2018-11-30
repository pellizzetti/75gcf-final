"use strict";

const Model = use("Model");

class Order extends Model {
  customer() {
    return this.belongsTo("App/Models/Customer");
  }

  products() {
    return this.belongsToMany("App/Models/Product")
      .withPivot(["quantity", "price", "discount"])
      .pivotModel("App/Models/OrderProduct");
  }
}

module.exports = Order;
