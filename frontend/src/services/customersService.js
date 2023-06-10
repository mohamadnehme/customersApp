import http from "../http-common";

// Create new customer
const createCustomer = async (customerData) => {
  const response = await http.post("/", customerData);

  return response.data;
};

// Update customer
const updateCustomer = async (id, customerData) => {
  const response = await http.put(`/${id}`, customerData);
  return response.data;
};

// Get all customers
const getCustomers = async () => {
  return await http.get("/");
};
// get Customer By Id
const getCustomerById = async (customerId) => {
  const response = await http.get(`/${customerId}`);

  return response.data;
};

// Delete customer
const deleteCustomer = async (customerId) => {
  const response = await http.delete(`/${customerId}`);

  return response.data;
};

const customersService = {
  createCustomer,
  updateCustomer,
  getCustomers,
  getCustomerById,
  deleteCustomer,
};

export default customersService;
