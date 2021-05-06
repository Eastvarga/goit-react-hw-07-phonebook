import axios from 'axios';
import actions from './contacts-action';
axios.defaults.baseURL = 'http://localhost:4040';

const {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} = actions;

const addContact = ({ name, number }) => dispatch => {
  const contact = { name, number, complited: false };

  dispatch(addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error)));
};

const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(deleteContactSuccess(Number(id))))
    .catch(error => dispatch(deleteContactError(error)));
};

//async method wariant
const fetchContacts = () => async dispatch => {
  dispatch(fetchContactRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error));
  }

  // axios
  //   .get('/contacts')
  //   .then(({ data }) => dispatch(fetchContactSuccess(data)))
  //   .catch(error => dispatch(fetchContactError(error)));
};
export default { addContact, deleteContact, fetchContacts };
