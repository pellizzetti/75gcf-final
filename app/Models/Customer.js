"use strict";

const Model = use("Model");

class Customer extends Model {
  orders() {
    return this.hasMany("App/Models/Order");
  }
}

module.exports = Customer;
