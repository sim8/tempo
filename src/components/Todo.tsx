import React from 'react';
import TodoCard from './TodoCard';

function TodoCheckbox({ done = false }) {
  return (
    <div className="shrink-0 w-4 h-4 rounded-full border-2 border-white "></div>
  );
}

export default function Todo({
  todo,
  selected,
}: {
  todo: string;
  selected: boolean;
}) {
  return (
    <TodoCard className="bg-slate-700">
      <TodoCheckbox />
      <span className="ml-2">{todo}</span>
    </TodoCard>
  );
}
