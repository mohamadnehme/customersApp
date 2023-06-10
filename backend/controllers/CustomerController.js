const asyncHandler = require('express-async-handler');

const Customer = require('../models/customerModel');
const { phoneVerification } = require('../services/validatePhoneNumber');

// GET /api/customers
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

// GET /api/customer/:id
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.status(200).json(customer);
});

// POST /api/customers
const addCustomer = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;

  if (!name || !address) {
    res.status(400).json({ error: 'Please add the required fields' });
    return;
  }
  let result = null;

  if (phone) {
    result = await phoneVerification.ValidatePhoneNumber(phone);
    if (result.valid == false) {
      res.status(400).json({ error: 'Phone number is not valid' });
      return;
    }
  }

  const customer = await Customer.create({
    name: name,
    address: address,
    phone: phone,
    countryCode: result?.country?.code,
    countryName: result?.country?.name,
    operatorName: result?.carrier,
  });

  res.status(200).json(customer);
});

// PUT /api/customers/:id
const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);

  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;

  if (!name || !address) {
    res.status(400).json({ error: 'Please add the required fields' });
    return;
  }
  if (!customer) {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }
  let result = null;

  if (phone) {
    result = await phoneVerification.ValidatePhoneNumber(phone);

    if (result.valid == false) {
      res.status(400).json({ error: 'phone number is not valid' });
      return;
    }
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      address: address,
      phone: phone,
      countryCode: result?.country?.code,
      countryName: result?.country?.name,
      operatorName: result?.carrier,
    },
    { returnOriginal: false },
  );
  res.status(200).json(updatedCustomer);
});

// DELETE /api/customers/:id
const deletCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404).json({error: 'Customer not found'});
    return;
  }

  await customer.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deletCustomer,
};
