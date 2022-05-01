/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_CURRENCIES, ADD_EXPENSE, EDIT_EXPENSE, DISABLE_EDITING,
} from '../actions';
import { getCurrencies, convertValue } from '../services';
import style from './ExpenseForm.module.css';
import walletLogo from '../images/logoWallet.png';

function ExpenseForm() {
  const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  const [value, setValue] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [convertTo, setConvertTo] = useState('BRL');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(1);
  const dispatch = useDispatch();
  const { currencies, expenses } = useSelector((state) => state.wallet);
  const { editing, expenseToEdit: { expense, index } } = useSelector((state) => state.editing);
  const { email } = useSelector((state) => state.user);

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
      setConvertTo(expense.convertTo);
      setMethod(expense.method);
      setTag(expense.tag);
      setDescription(expense.description);
    }
  }, [editing]);

  const editExpense = (obj) => {
    const editedExpenses = expenses;
    editedExpenses[index] = obj;
    dispatch({
      type: EDIT_EXPENSE,
      payload: editedExpenses,
    });
    dispatch({
      type: DISABLE_EDITING,
    });
  };

  const addExpense = async () => {
    const { convertedValue, convertionRatio } = await convertValue(value, currency, convertTo);
    const obj = {
      id,
      description,
      tag,
      method,
      value,
      convertionRatio: Number(convertionRatio.toFixed(4)),
      convertedValue: Number(convertedValue.toFixed(2)),
      currency,
      convertTo,
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
    <section className={style.expenseFormPage}>
      <div className={style.formHeader}>
        <img
          className={style.logoImg}
          src={walletLogo}
          alt=""
        />
      </div>
      <div className={style.userMail}>
        <span>{email}</span>
      </div>
      <Form className={style.expenseForm}>
        <div className={style.valueCurrencyAndConvertTo}>
          <Form.Label
            className={style.valueLabel}
            htmlFor="value"
          >
            Valor:
            <Form.Control
              type="number"
              name="value"
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
          </Form.Label>
          <Form.Label htmlFor="currency">
            Moeda:
            <Form.Select
              id="currency"
              name="currency"
              value={currency}
              onChange={({ target }) => setCurrency(target.value)}
            >
              <option>BRL</option>
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Select>
          </Form.Label>
          <Form.Label htmlFor="convertTo">
            Converter para:
            <Form.Select
              id="convertTo"
              name="convertTo"
              value={convertTo}
              onChange={({ target }) => setConvertTo(target.value)}
            >
              <option>BRL</option>
              {currencies.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Select>
          </Form.Label>
        </div>
        <div className={style.methodAndTagContainer}>
          <Form.Label htmlFor="method">
            Método de pagamento:
            <Form.Select
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
            </Form.Select>
          </Form.Label>
          <Form.Label htmlFor="tag">
            Tag:
            <Form.Select
              name="tag"
              value={tag}
              onChange={({ target }) => setTag(target.value)}
            >
              {tags.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Form.Select>
          </Form.Label>
        </div>
        <Form.Label htmlFor="description">
          Descrição:
          <Form.Control
            name="description"
            type="text"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Form.Label>
        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={addExpense}
        >
          {!editing ? 'Adicionar despesa' : 'Editar despesa'}
        </Button>
      </Form>
    </section>
  );
}

export default ExpenseForm;
