import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customersError, customersLoading, reset } from '../reducers/customerSlice';
import customersService from '../services/customersService';

function CustomerUpdateForm({ customer }) {
  const [name, setName] = useState(customer.name);
  const [address, setAddress] = useState(customer.address);
  const [phone, setPhone] = useState(customer.phone);
  const id = customer._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.customer.error);

  //clean up function to prevent leaks in memory
  useEffect(() => {
    return () => {
      setName('');
      setAddress('');
      setPhone('');
    }
  }, [])

  useEffect(() => {
    if (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      }
    }
  }, [error, dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error('Please add the required fileds');
      return;
    }
    try {
      dispatch(customersLoading());
      const response = await customersService.updateCustomer(id, { name, address, phone });
      // dispatch(customerUpdated({ id: id, updatedCustomer: response }))
      navigate("/");
    } catch (error) {
      dispatch(customersError(error));
      dispatch(reset());
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Name*</label>
          <input
            type="text"
            name="text"
            id="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="text">Address*</label>
          <input
            type="text"
            name="text"
            id="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="text">Phone</label>
          <input
            type="text"
            name="text"
            id="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Update Customer
          </button>
        </div>
      </form>
    </section>
  );
}

export default CustomerUpdateForm;
