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
  const {
    onCreateTodo,
    onSelectTodo,
    onMarkTodoComplete,
    selectedTodoIndex,
    isEditing,
  } = useTodos(todos, onUpdateTodos);
  return (
    <div className="p-4 pt-8 flex flex-col h-full">
      <ul>
        {todos.map((todo, index) => {
          const isSelected = selectedTodoIndex === index;
          return (
            <li
              key={todo}
              className={isSelected ? 'text-white' : 'text-slate-200'}
            >
              <TodoCard
                todo={todo}
                selected={isSelected}
                onClick={() => {
                  onSelectTodo(index);
                }}
                onToggleComplete={() => onMarkTodoComplete(index)}
              />
            </li>
          );
        })}
      </ul>
      <TodoAffordanceAndEditor onCreate={onCreateTodo} />
    </div>
  );
}
