"use strict";

const Schema = use("Schema");

class CustomerSchema extends Schema {
  up() {
    this.create("customers", table => {
      table.increments();
      table.text("name");
      table.text("doc");
      table.text("address");
      table.text("number");
      table.text("district");
      table.text("city");
      table.text("cep");
      table.text("state");
      table.timestamps();
    });
  }

  down() {
    this.drop("customers");
  }
}

module.exports = CustomerSchema;
