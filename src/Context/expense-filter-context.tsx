import * as React from 'react';

export const ContextExpenseFilter = React.createContext<ExpenseFilterContextType|null>(null);
export type ExpenseFilter = {
  start?: string;
  end?: string;
  pago?: boolean;
  categoryId?: number;
  walletId?: number;
  dateField?: string;
}

export type ExpenseFilterContextType = {
  filter: ExpenseFilter;
  setFilter: (filter: ExpenseFilter) => void;
};

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};
const ExpenseFilterProvider:  React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = React.useState<ExpenseFilter>({});

  return (
    <ContextExpenseFilter.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </ContextExpenseFilter.Provider>
  );
}

export default ExpenseFilterProvider;
