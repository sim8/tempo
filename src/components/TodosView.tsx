import React from 'react';
import { Todos } from '../types';
import Todo from './Todo';
import TodoAffordanceAndEditor from './TodoAffordanceAndEditor';

export default function TodosView({ todos }: { todos: Todos }) {
  const selectedTodo = todos[0];
  return (
    <div className="p-4 pt-8 flex flex-col h-full">
      <ul>
        {todos.map(todo => (
          <li
            key={todo}
            className={todo === selectedTodo ? 'text-white' : 'text-slate-200'}
          >
            <Todo todo={todo} selected={todo === selectedTodo} />
          </li>
        ))}
      </ul>
      <TodoAffordanceAndEditor />
    </div>
  );
}
