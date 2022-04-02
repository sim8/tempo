import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import TodosView from './TodosView';

describe('TodosViews', () => {
  render(
    <TodosView
      todos={[]}
      onUpdateTodos={() => {
        console.log('done');
      }}
    />
  );
  test('it does this', () => {
    expect(1).toEqual(1);
  });

  // renders todos
  // can add new todo
  // can select todo
  // can update todo
  // can mark todo complete
});
