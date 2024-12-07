import { Transaction } from '../Transaction';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Salary',
    amount: 2000.00,
    type: 'income',
    category: 'Salary',
    date: new Date('2024-12-01'),
  },
  {
    id: '2',
    name: 'Groceries',
    amount: 150.75,
    type: 'expense',
    category: 'Groceries',
    date: new Date('2024-12-02'),
  },
  {
    id: '3',
    name: 'Freelance Project',
    amount: 500.00,
    type: 'income',
    category: 'Freelance',
    date: new Date('2024-12-03'),
  },
  {
    id: '4',
    name: 'Netflix Subscription',
    amount: 12.99,
    type: 'expense',
    category: 'Entertainment',
    date: new Date('2024-12-04'),
  },
  {
    id: '5',
    name: 'Electricity Bill',
    amount: 75.50,
    type: 'expense',
    category: 'Utilities',
    date: new Date('2024-12-05'),
  },
];
