import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { Todo } from '../types';
import TodosView from './TodosView';

const MOCK_TODOS: Todo[] = ['Todo 1', 'Todo 2'];

const TodosViewWrapper = () => {
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
  return <TodosView todos={todos} onUpdateTodos={setTodos} />;
};

describe('TodosViews', () => {
  test('renders todos', () => {
    render(<TodosViewWrapper />);
    expect(screen.queryByText('Todo 1')).toBeTruthy();
    expect(screen.queryByText('Todo 2')).toBeTruthy();
  });

  test('can add new todo', () => {
    render(<TodosViewWrapper />);

    // Affordance is not visible
    expect(screen.queryByText('New...')).toBeNull();
    const todoAffordance = screen.getByTestId('todo-affordance');
    userEvent.hover(todoAffordance);
    // Affordance is visible
    expect(screen.queryByText('New...')).toBeTruthy();

    // Input is not visible
    expect(screen.queryByTestId('todo-name-input')).toBeNull();
    userEvent.click(todoAffordance);
    // Input is visible
    expect(screen.queryByTestId('todo-name-input')).toBeTruthy();

    // Type todo name
    const todoInput = screen.getByTestId('todo-name-input');
    userEvent.type(todoInput, 'Todo 3');

    // Add todo
    const addButton = screen.getByText('Add');
    userEvent.click(addButton);

    // Input is not visible
    expect(screen.queryByTestId('todo-name-input')).toBeNull();
    // Todo created
    expect(screen.queryByText('Todo 3')).toBeTruthy();
  });

  test('can select todo', () => {
    render(<TodosViewWrapper />);
    // none selected by default
    expect(screen.queryByTestId('selected-todo')).toBeNull();
  });
  // can select todo
  // can update todo
  // can mark todo complete
});
