import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { customerDeleted, customersError, customersLoading } from '../reducers/customerSlice';
import customersService from '../services/customersService';

function CustomerItem({ customer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    dispatch(customersLoading());
    try {
      customersService.deleteCustomer(id);
      dispatch(customerDeleted(id));
    } catch (error) {
      dispatch(customersError(error));
    }
  }

  return (
    <div className="customer">
      <div>{new Date(customer.createdAt).toLocaleString('en-US')}</div>
      Name: <h4>{customer.name}</h4>
      Address: <h4>{customer.address}</h4>
      {customer.phone && <div>Phone: <h4>{customer.phone}</h4>
        countryCode: <h4>{customer.countryCode}</h4>
        countryName: <h4>{customer.countryName}</h4>
        operatorName: <h4>{customer.operatorName}</h4>
      </div>}
      <button
        onClick={() => {deleteHandler(customer._id)}}
        className="close"
      >
        X
      </button>
      <AiOutlineEdit
        onClick={() => navigate(`update/${customer._id}`)}
        className="update"
      />
    </div>
  );
}

export default CustomerItem;
