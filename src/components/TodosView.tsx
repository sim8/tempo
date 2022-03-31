import React from 'react';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types';
import TodoCard from './Todo'; // rename?
import TodoAffordanceAndEditor from './TodoAffordanceAndEditor';

export default function TodosView({
  todos,
  onUpdateTodos,
}: {
  todos: Todo[];
  onUpdateTodos: (todos: Todo[]) => void;
}) {
  const { onCreateTodo, onMarkTodoComplete } = useTodos(todos, onUpdateTodos);
  const selectedTodo = todos[0];
  return (
    <div className="p-4 pt-8 flex flex-col h-full">
      <ul>
        {todos.map((todo, index) => (
          <li
            key={todo}
            className={todo === selectedTodo ? 'text-white' : 'text-slate-200'}
          >
            <TodoCard
              todo={todo}
              selected={todo === selectedTodo}
              onToggleComplete={() => onMarkTodoComplete(index)}
            />
          </li>
        ))}
      </ul>
      <TodoAffordanceAndEditor onCreate={onCreateTodo} />
    </div>
  );
}
