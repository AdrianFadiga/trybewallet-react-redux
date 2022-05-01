import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { RiDeleteBin2Fill, RiFileEditFill } from 'react-icons/ri';
import { GiConfirmed } from 'react-icons/gi';
import { handleDelete, getExpenseObject } from '../helpers';
import ExpenseForm from '../components/ExpenseForm';
import { DELETE_EXPENSE, GET_EXPENSE_TO_EDIT } from '../actions';
import style from './Wallet.module.css';

function Carteira() {
  const tableHead = ['Descrição', 'Tag', 'Método de Pagamento',
    'Valor', 'Moeda', 'Câmbio Utilizado', 'Valor Convertido',
    'Moeda de conversão', 'Editar/Excluir'];
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.wallet);
  const { editing } = useSelector((state) => state.editing);

  return (
    <section className={style.walletPage}>
      <ExpenseForm />
      <Table
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            {tableHead.map((t) => (
              <th key={t}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            description,
            tag,
            method,
            value,
            currency,
            convertionRatio,
            convertedValue,
            convertTo,
            id,
          }) => (
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
                {!editing && (
                <button
                  type="button"
                  onClick={() => dispatch({
                    type: DELETE_EXPENSE,
                    payload: handleDelete(id, expenses),
                  })}
                >
                  <RiDeleteBin2Fill />
                </button>
                )}
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
          ))}
        </tbody>
      </Table>
    </section>
  );
}

export default Carteira;
