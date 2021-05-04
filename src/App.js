import Form from './components/Form';
import ContactList from './components/ContactList';
import FindInput from './components/FindInput';
import { connect } from 'react-redux';
import './styles.css';

function App({ loadingContacts, errorContacts }) {
  console.dir(errorContacts);
  return (
    <div className="container">
      <h1 className="main_title">Phonebook</h1>
      <Form />
      <h2 className="sub_title">Contacts</h2>
      {loadingContacts && <h1>Loading...</h1>}
      {errorContacts && <h1>{`${errorContacts}`}</h1>}
      <FindInput />
      <ContactList />
    </div>
  );
}
const mapStateToProps = ({ contacts: { loading, error } }) => ({
  loadingContacts: loading,
  errorContacts: error,
});
export default connect(mapStateToProps)(App);
