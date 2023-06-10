import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerUpdateForm from '../components/customerUpdateForm';
import Spinner from '../components/Spinner';
import customersService from '../services/customersService';
import { customersError, customersLoading, getCustomerByIdSuccess } from '../reducers/customerSlice';

function UpdateCustomer() {
  const id = useParams()['id'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector(state => state.customer.customer);
  const isLoading = useSelector(state => state.customer.isLoading);

  const getCustomerById = useCallback(async (id) => {
    try {
      dispatch(customersLoading());
      const response = await customersService.getCustomerById(id);
      dispatch(getCustomerByIdSuccess(response));
    } catch (error) {
      dispatch(customersError(error));
    }
  }, [dispatch])

  useEffect(() => {
    getCustomerById(id)
  }, [navigate, dispatch, id, getCustomerById]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>{customer && <CustomerUpdateForm customer={customer} />}</>;
}

export default UpdateCustomer;
