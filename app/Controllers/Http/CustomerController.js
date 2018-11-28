"use strict";

const Customer = use("App/Models/Customer");

const { validateAll } = use("Validator");

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   */
  async index({ view }) {
    const customers = await Customer.all();

    return view.render("customers.index", {
      customers: customers.toJSON()
    });
  }

  /**
   * Display a single customer.
   * GET customers/:id
   */
  async show({ params, view }) {
    try {
      const customer = await Customer.findOrFail(params.id);

      return view.render("customers.detail", {
        customer: customer.toJSON()
      });
    } catch (err) {
      return view.render("error.index", {
        message: "Esse cliente não existe! :(",
        back: "customers",
        err
      });
    }
  }

  /**
   * Render a form to be used for creating a new customer.
   * GET customers/create
   */
  async create({ view }) {
    return view.render("customers.form", {
      editing: false
    });
  }

  /**
   * Render a form to update an existing customer.
   * GET customers/:id/edit
   */
  async edit({ params, view }) {
    try {
      const customer = await Customer.findOrFail(params.id);

      return view.render("customers.form", {
        editing: true,
        customer: customer.toJSON()
      });
    } catch (err) {
      return view.render("error.index", {
        message: "Esse cliente não existe! :(",
        back: "customers",
        err
      });
    }
  }

  /**
   * Create/save a customer.
   * POST/PUT customers
   */
  async store({ request, session, response }) {
    const rules = {
      name: "required|min:3|max:25",
      doc: "required|number|min:11|max:11"
    };

    const messages = {
      "name.required": "O nome é obrigatório",
      "name.min": "O nome deve ter no mínimo 3 caracteres",
      "name.max": "O nome deve ter no máximo 25 caracteres",
      "doc.required": "O CPF é obrigatório",
      "doc.number": "O CPF deve conter apenas digítos",
      "doc.min": "O CPF deve ter 11 digítos",
      "doc.max": "O CPF deve ter 11 digítos"
    };

    const customerData = request.only([
      "id",
      "name",
      "doc",
      "address",
      "number",
      "district",
      "city",
      "cep",
      "state"
    ]);

    const validation = await validateAll(customerData, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    let customer = null;
    if (customerData.id !== "null") {
      customer = await Customer.find(customerData.id);
    } else {
      customer = new Customer();
    }

    customer.name = customerData.name;
    customer.doc = customerData.doc;
    customer.address = customerData.address;
    customer.number = customerData.number;
    customer.district = customerData.district;
    customer.city = customerData.city;
    customer.cep = customerData.cep;
    customer.state = customerData.state;

    await customer.save();

    return response.redirect("/customers");
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   */
  async destroy({ params, response, view }) {
    try {
      const customer = await Customer.findOrFail(params.id);

      await customer.delete();

      return response.redirect("/customers");
    } catch (err) {
      return view.render("error.index", {
        message: "Esse cliente não existe! :(",
        back: "customers",
        err
      });
    }
  }
}

module.exports = CustomerController;
