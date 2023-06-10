import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import CustomerItem from '../components/CustomerItem';
import CustomerForm from '../components/CustomerForm';
import { toast } from 'react-toastify';
import customersService from '../services/customersService';
import { useDispatch, useSelector } from 'react-redux';
import { customersError, customersLoading, customersReceived, reset } from '../reducers/customerSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customers = useSelector(state => state.customer.customers);
  const isLoading = useSelector(state => state.customer.isLoading);
  const error = useSelector(state => state.customer.error);

  const getAllCustomers = useCallback(async () => {
    try {
      dispatch(customersLoading())
      const response = await customersService.getCustomers();
      dispatch(customersReceived(response.data));
    } catch (error) {
      dispatch(customersError(error));
    }
  }, [dispatch])

  useEffect(() => {
    if (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      }
    }
  }, [error, dispatch])

  useEffect(() => {
    getAllCustomers();
  }, [navigate, getAllCustomers, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
        <p>Customers List</p>
      </section>

      <CustomerForm />

      <section className="content">
        {customers.length > 0 ? (
          <div className="customers">
            {customers.map((customer, index) => (
              <CustomerItem key={index} customer={customer} />
            ))}
          </div>
        ) : (
          <h3>There is no Customers yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
