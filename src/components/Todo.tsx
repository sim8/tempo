import classNames from 'classnames';
import React from 'react';
import TodoCard from './TodoCard';

function TodoCheckbox({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="shrink-0 w-4 h-4 rounded-full border-2 border-white cursor-pointer"
      onClick={e => {
        onClick();
        e.stopPropagation();
      }}
    />
  );
}

export default function Todo({
  todo,
  selected,
  onToggleComplete,
  onClick,
}: {
  todo: string;
  selected: boolean;
  onToggleComplete: () => void;
  onClick: () => void;
}) {
  return (
    <TodoCard
      className={classNames('bg-slate-700', {
        'outline outline-2 outline-white': selected,
      })}
      onClick={onClick}
      data-testid={selected ? 'selected-todo' : undefined}
    >
      <TodoCheckbox onClick={onToggleComplete} />
      <span className="ml-2">{todo}</span>
    </TodoCard>
  );
}
