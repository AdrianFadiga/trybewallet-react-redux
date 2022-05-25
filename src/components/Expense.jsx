import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBin2Fill, RiFileEditFill } from 'react-icons/ri';
import { GiConfirmed } from 'react-icons/gi';
import { DELETE_EXPENSE, GET_EXPENSE_TO_EDIT } from '../actions';
import { handleDelete, getExpenseIndex } from '../helpers';

function Expense({
  expense: {
    description,
    tag,
    method,
    value,
    currency,
    convertionRatio,
    convertedValue,
    convertTo,
    id,
  },
}) {
  const { expenses } = useSelector((state) => state.wallet);
  const { editing } = useSelector((state) => state.editing);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  return (
    <tr key={id}>
      <td>{description}</td>
      <td>{tag}</td>
      <td>{method}</td>
      <td>{value}</td>
      <td>{currency}</td>
      <td>{convertionRatio}</td>
      <td>{convertedValue}</td>
      <td>{convertTo}</td>
      <td>
        <button
          type="button"
          disabled={editing}
          onClick={() => dispatch({
            type: DELETE_EXPENSE,
            payload: handleDelete(id, expenses),
          })}
        >
          <RiDeleteBin2Fill />
        </button>
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => dispatch({
            type: GET_EXPENSE_TO_EDIT,
            payload: getExpenseIndex(id, expenses),
          })}
        >
          {!editing ? <RiFileEditFill /> : <GiConfirmed />}
        </button>
      </td>
    </tr>
  );
}

export default Expense;
