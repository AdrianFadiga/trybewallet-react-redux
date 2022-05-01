import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBin2Fill, RiFileEditFill } from 'react-icons/ri';
import { GiConfirmed } from 'react-icons/gi';
import { DELETE_EXPENSE, GET_EXPENSE_TO_EDIT } from '../actions';
import { handleDelete, getExpenseObject } from '../helpers';

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
  const { editing, expenseToEdit } = useSelector((state) => state.editing);
  const [isDisabled, setIsDisabled] = useState(false);
  // Por algum motivo o expenseToEdit inicia como array e depois muda para um obj;
  // Modificar a lógica de como está enviando para o reducer editing,
  // para que chegue lá como um array;
  // E assim se tornar possível fazer a validação dos botões disableds;
  // Provavelmente terá de ser modificada alguma outra lógica na hora de editar a despesa;
  console.log(expenseToEdit);
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
          // disabled={expenseToEdit[0].expense.id === id}
          onClick={() => dispatch({
            type: DELETE_EXPENSE,
            payload: handleDelete(id, expenses),
          })}
        >
          <RiDeleteBin2Fill />
        </button>
        <button
          type="button"
          onClick={() => dispatch({
            type: GET_EXPENSE_TO_EDIT,
            payload: getExpenseObject(id, expenses),
          })}
        >
          {!editing ? <RiFileEditFill /> : <GiConfirmed />}
        </button>
      </td>
    </tr>
  );
}

export default Expense;
