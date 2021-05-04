import Form from './components/Form';
import ContactList from './components/ContactList';
import FindInput from './components/FindInput';
import { connect } from 'react-redux';
import { contactsSelectors } from './redux/contacts';
import './styles.css';

function App({ isLoadingContacts, errorContacts }) {
  // console.dir(errorContacts);
  return (
    <div className="container">
      <h1 className="main_title">Phonebook</h1>
      <Form />
      <h2 className="sub_title">Contacts</h2>
      {isLoadingContacts && <h1>Loading...</h1>}
      {errorContacts && (
        <div className="error">
          <h1>{errorContacts.name}</h1>
          <p>{errorContacts.message}</p>
          <p>{errorContacts.stack}</p>
        </div>
      )}
      <FindInput />
      <ContactList />
    </div>
  );
}
const mapStateToProps = state => ({
  isLoadingContacts: contactsSelectors.getLoadingContacts(state),
  errorContacts: contactsSelectors.getError(state),
});
export default connect(mapStateToProps)(App);
