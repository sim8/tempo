import React from 'react';
import Todo from './Todo';

export default function TodosView() {
  const MOCK_TODOS = [
    'Read emails',
    'Make progress on prototype',
    'Rough structure for presentation',
    'Plan team celebration',
  ];
  const selectedTodo = MOCK_TODOS[2];
  return (
    <ul className="m-4 mt-8">
      {MOCK_TODOS.map(todo => (
        <li
          key={todo}
          className={todo === selectedTodo ? 'text-white' : 'text-slate-200'}
        >
          <Todo todo={todo} selected={todo === selectedTodo} />
        </li>
      ))}
    </ul>
  );
}
