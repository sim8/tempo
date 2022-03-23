import React from 'react';

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
    <div className="flex items-center p-4 bg-slate-700 rounded-lg mb-2">
      <TodoCheckbox />
      <span className="ml-2">{todo}</span>
    </div>
  );
}
