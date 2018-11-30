"use strict";

const Schema = use("Schema");

class OrderProductSchema extends Schema {
  up() {
    this.create("orders_products", table => {
      table
        .integer("order_id")
        .references("id")
        .inTable("orders")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity");
      table.decimal("price", 14, 2);
      table.decimal("discount", 14, 2);
    });
  }

  down() {
    this.drop("orders_products");
  }
}

module.exports = OrderProductSchema;
