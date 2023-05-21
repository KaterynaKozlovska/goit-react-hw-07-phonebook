import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/contacts/filter';
import { getFilterValue } from '../../redux/contacts/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);

  return (
    <div>
      <label className={css.filter__label}>Find contacts by name</label>
      <input
        className={css.filter__input}
        type="text"
        name="filter"
        title="Name may contain only letters"
        value={filterValue}
        onChange={e => dispatch(setFilter(e.currentTarget.value))}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
