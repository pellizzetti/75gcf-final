"use strict";

const Model = use("Model");

class OrderProduct extends Model {
  static get table() {
    return "orders_products";
  }

  static get primaryKey() {
    return null;
  }

  static get incrementing() {
    return false;
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }
}

module.exports = OrderProduct;
