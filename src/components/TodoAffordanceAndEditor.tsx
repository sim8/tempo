import React, { useState } from 'react';
import useIsHovering from '../hooks/useIsHovering';
import TodoCard from './TodoCard';

export default function TodoAffordanceAndEditor() {
  const [isHovering, mouseEventHandlers] = useIsHovering();
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <TodoCard className="bg-slate-700/25 border-solid border-2 border-white">
        <span className="ml-2 text-white">
          <input
            type="text"
            className="border-none outline-none bg-transparent"
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        </span>
      </TodoCard>
    );
  }
  return (
    <div
      className="grow relative cursor-pointer"
      {...mouseEventHandlers}
      onClick={() => setIsEditing(true)}
    >
      {isHovering && (
        <TodoCard className="bg-slate-700/25 border-dashed border-2 border-white">
          <span className="ml-2 text-white">New...</span>
        </TodoCard>
      )}
    </div>
  );
}
