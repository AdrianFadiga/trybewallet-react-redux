import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import ExpenseForm from '../components/ExpenseForm';
import style from './Wallet.module.css';
import Expense from '../components/Expense';

function Carteira() {
  const tableHead = ['Descrição', 'Tag', 'Método de Pagamento',
    'Valor', 'Moeda', 'Câmbio Utilizado', 'Valor Convertido',
    'Moeda de conversão', 'Excluir/Editar'];
  const { expenses } = useSelector((state) => state.wallet);

  return (
    <section className={style.walletPage}>
      <ExpenseForm />
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{
          height: 'min-content',
        }}
      >
        <thead>
          <tr>
            {tableHead.map((t) => (
              <th key={t}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <Expense expense={expense} />
          ))}
        </tbody>
      </Table>
    </section>
  );
}

export default Carteira;
