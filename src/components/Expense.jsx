import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiFileEditFill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { DELETE_EXPENSE, GET_EXPENSE_TO_EDIT, DISABLE_EDITING } from '../actions';
import { handleDelete, getExpenseIndex } from '../helpers';
import style from './Expense.module.css';

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
  const { editing, index } = useSelector((state) => state.editing);
  const dispatch = useDispatch();

  return (
    <tr
      key={id}
      className={style.tableRow}
    >
      <td
        className={style.xablau}
      >
        {description}

      </td>
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
          <AiFillDelete />
        </button>
        {!editing && (
          <button
            type="button"
            disabled={editing}
            onClick={() => dispatch({
              type: GET_EXPENSE_TO_EDIT,
              payload: getExpenseIndex(id, expenses),
            })}
          >
            <RiFileEditFill />
          </button>
        )}
        {editing && (
        <button
          type="button"
          disabled={expenses[index].id !== id}
          onClick={() => dispatch({
            type: DISABLE_EDITING,
          })}
        >
          {expenses[index].id !== id ? <RiFileEditFill /> : <GiConfirmed />}
        </button>
        )}
      </td>
    </tr>
  );
}

export default Expense;
