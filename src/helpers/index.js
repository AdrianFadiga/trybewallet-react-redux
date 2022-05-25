export const validatePassword = (email, password) => {
  const MIN_LENGTH = 6;
  const validate = (
    password.length >= MIN_LENGTH
    && email.includes('@')
    && email.includes('.com')
  );
  return validate;
};

export const handleDelete = (id, expenses) => expenses.filter((f) => f.id !== id);

export const getExpenseIndex = (id, expenses) => expenses.findIndex((e) => e.id === id);
