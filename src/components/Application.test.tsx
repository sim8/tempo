import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Application from './Application';

// TODO - Application.test is a misleading name given this is only testing useLists logic
// TODO will need stubbing when coming from server

// const INITIAL_STATE = {
//   lists: [
//     {
//       name: 'Inbox',
//       todos: [
//         'Read emails',
//         'Make progress on prototype',
//         'Rough structure for presentation',
//         'Plan team celebration',
//       ],
//     },
//     {
//       name: 'Backlog',
//       todos: ['Biggy thinky', 'Rethink org structure'],
//     },
//   ],
//   selectedListIndex: 0,
//   isCreating: false,
//   isUpdating: false,
// };

describe('ListsViews', () => {
  test('renders lists', () => {
    render(<Application />);
    expect(screen.queryByText('Inbox')).toBeTruthy();
    expect(screen.queryByText('Backlog')).toBeTruthy();
  });

  test('can add list', () => {
    render(<Application />);
    // Input is not visible
    expect(screen.queryByTestId('list-name-input')).toBeNull();
    const listAffordance = screen.getByTestId('list-affordance');
    userEvent.click(listAffordance);
    // Input is visible
    expect(screen.queryByTestId('list-name-input')).toBeTruthy();

    // Type list name
    const listInput = screen.getByTestId('list-name-input');
    userEvent.type(listInput, 'Other todos');

    // Add list
    const addButton = screen.getByText('Add');
    userEvent.click(addButton);

    // Input is not visible
    expect(screen.queryByTestId('list-name-input')).toBeNull();
    // List created
    expect(screen.queryByText('Other todos')).toBeTruthy();
  });

  test('can select list', () => {
    render(<Application />);
    expect(screen.queryByText('Read emails')).toBeTruthy();
    expect(screen.queryByText('Biggy thinky')).toBeNull();
    const otherList = screen.getByText('Backlog');
    userEvent.click(otherList);
    expect(screen.queryByText('Read emails')).toBeNull();
    expect(screen.queryByText('Biggy thinky')).toBeTruthy();
  });
});
