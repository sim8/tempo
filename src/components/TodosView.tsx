import React from 'react';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types';
import TodoCard from './Todo'; // rename?
import TodoAffordanceAndEditor from './TodoAffordanceAndEditor';
import TodoEditor, { EditorType } from './TodoEditor';

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
    onUpdateTodo,
    onMarkTodoComplete,
    selectedTodoIndex,
    onStartEditing,
    onStopEditing,
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
              {isEditing && isSelected ? (
                <TodoEditor
                  onSave={next => onUpdateTodo({ index, todo: next })}
                  onCancel={onStopEditing}
                  editorType={EditorType.UPDATE}
                  initialState={todo}
                />
              ) : (
                <TodoCard
                  todo={todo}
                  selected={isSelected}
                  onClick={() => {
                    onSelectTodo(index);
                  }}
                  onToggleComplete={() => onMarkTodoComplete(index)}
                />
              )}
            </li>
          );
        })}
      </ul>
      <TodoAffordanceAndEditor
        onCreate={onCreateTodo}
        onCancel={onStopEditing}
        isCreating={isEditing && selectedTodoIndex === null}
        onStartCreating={() => onStartEditing(null)}
      />
    </div>
  );
}
