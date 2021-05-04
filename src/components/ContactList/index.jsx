import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import operations from '../../redux/contacts/contacts-operations';
// import PropTypes from "prop-types";
import { list, item, text, button } from './styles.module.css';

function ContactList({ onDeleteContact, fetchContacts, items }) {
  useEffect(() => fetchContacts(), []);
  return (
    <ul className={list}>
      {items.length > 0 &&
        items.map(({ id, name, number }) => (
          <li className={item} key={id}>
            <span className={text}>{name}:</span>
            <span className={text}>{number}</span>
            <button
              className={button}
              id={id}
              type="button"
              onClick={onDeleteContact}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}

const filterContacts = ({ items, filter }) => {
  const normalizedfilter = filter.toLowerCase();
  return items.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedfilter);
  });
};

const mapStateToProps = ({ contacts: { items, filter } }) => {
  return {
    items: filterContacts({ items, filter }),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteContact: event => 
      dispatch(operations.deleteContact(event.target.id)),
    fetchContacts: () => dispatch(operations.fetchContacts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
