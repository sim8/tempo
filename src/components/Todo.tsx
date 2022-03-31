import React from 'react';
import TodoCard from './TodoCard';

function TodoCheckbox({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="shrink-0 w-4 h-4 rounded-full border-2 border-white cursor-pointer"
      onClick={onClick}
    />
  );
}

export default function Todo({
  todo,
  selected,
  onToggleComplete,
}: {
  todo: string;
  selected: boolean;
  onToggleComplete: () => void;
}) {
  return (
    <TodoCard className="bg-slate-700">
      <TodoCheckbox onClick={onToggleComplete} />
      <span className="ml-2">{todo}</span>
    </TodoCard>
  );
}
