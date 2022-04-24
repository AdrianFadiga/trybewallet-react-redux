/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_CURRENCIES, ADD_EXPENSE, EDIT_EXPENSE, GET_EXPENSE_TO_EDIT,
} from '../actions';
import { getCurrencies, convertValue } from '../services';

function Header() {
  const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  const [value, setValue] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [description, setDescription] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);
  const [id, setId] = useState(1);
  const dispatch = useDispatch();
  const { currencies, expenses } = useSelector((state) => state.wallet);
  const { editing, expenseToEdit: { expense, index } } = useSelector((state) => state.editing);

  useEffect(async () => {
    const getCurrenciesEffect = async () => {
      const data = await getCurrencies();
      dispatch({ type: GET_CURRENCIES, payload: data });
    };
    getCurrenciesEffect();
  }, []);

  useEffect(() => {
    if (expense) {
      setValue(expense.value);
      setCurrency(expense.currency);
      setMethod(expense.method);
      setTag(expense.tag);
      setDescription(expense.description);
    }
  }, [editing]);

  useEffect(() => {
    setTotalExpense(expenses.reduce((acc, curr) => {
      acc += curr.convertedValue;
      return Number(acc.toFixed(2));
    }, 0));
  }, [expenses, editing]);

  const editExpense = (obj) => {
    const editedExpenses = expenses;
    editedExpenses[index] = obj;
    dispatch({
      type: EDIT_EXPENSE,
      payload: editedExpenses,
    });
    dispatch({
      type: GET_EXPENSE_TO_EDIT,
      payload: [],
    });
  };

  const addExpense = async () => {
    const { convertedValue, convertionRatio } = await convertValue(value, currency);
    const obj = {
      id,
      description,
      tag,
      method,
      value,
      convertionRatio,
      convertedValue: Number(convertedValue.toFixed(2)),
      currency,
      real: 'real',
    };
    if (!editing) {
      dispatch({
        type: ADD_EXPENSE,
        payload: {
          ...obj,
        },
      });
      setValue(0);
      setId(id + 1);
      return 'so p pausar a função msm';
    }
    return editExpense(obj);
  };

  return (
    <section className="header">
      <header>
        <span>{totalExpense}</span>
      </header>
      <form>
        <label htmlFor="value">
          Value:
          <input
            type="number"
            name="value"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            value={currency}
            onChange={({ target }) => setCurrency(target.value)}
          >
            {currencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            value={method}
            onChange={({ target }) => { setMethod(target.value); }}
          >
            {methods.map((m) => (
              <option
                key={m}
                value={m}
              >
                {m}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            value={tag}
            onChange={({ target }) => setTag(target.value)}
          >
            {tags.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            type="text"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </label>
        <button
          type="button"
          onClick={addExpense}
        >
          {!editing ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    </section>
  );
}

export default Header;
