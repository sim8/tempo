import React from 'react';

export default function TodosView() {
  const MOCK_TODOS = [
    'Read emails',
    'Make progress on prototype',
    'Rough structure for presentation',
    'Plan team celebration'
  ]
  const selectedTodo = MOCK_TODOS[2];
  return (
    <ul>
      {MOCK_TODOS.map(todo => <li key={todo} className={todo === selectedTodo ? 'text-white' : 'text-slate-200'}>{todo}</li>)}
    </ul>
  );
}
