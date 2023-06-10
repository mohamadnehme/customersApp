import { useEffect, useState } from 'react';
import customersService from '../services/customersService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { customerAdded, customersError, customersLoading } from '../reducers/customerSlice';

function CustomerForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  //clean up function to prevent leaks in memory
  useEffect(() => {
    return () => {
      setName('');
      setAddress('');
      setPhone('');
    }
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error('Please add the required fileds');
      return;
    }
    try {
      dispatch(customersLoading());
      const response = await customersService.createCustomer({ name, address, phone })
      dispatch(customerAdded(response))
    } catch (error) {
      dispatch(customersError(error));
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
            Add Customer
          </button>
        </div>
      </form>
    </section>
  );
}

export default CustomerForm;
