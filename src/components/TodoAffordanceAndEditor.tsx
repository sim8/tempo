import React from 'react';
import useIsHovering from '../hooks/useIsHovering';
import TodoCard from './TodoCard';
import { Todo } from '../types';
import classNames from 'classnames';
import TodoEditor from './TodoEditor';

export default function TodoAffordanceAndEditor({
  onCreate,
  onCancel,
  onStartCreating,
  isCreating,
}: {
  onCreate: (todo: Todo) => void;
  onCancel: () => void;
  onStartCreating: () => void;
  isCreating: boolean;
}) {
  const [isHovering, mouseEventHandlers] = useIsHovering();

  if (isCreating) {
    return <TodoEditor onSave={onCreate} onCancel={onCancel} />;
  }
  return (
    <div
      className={classNames('grow relative', {
        'cursor-pointer': isHovering,
      })}
      {...mouseEventHandlers}
      onClick={onStartCreating}
      data-testid="todo-affordance"
    >
      {isHovering && (
        <TodoCard className="bg-slate-700/50 border-dashed border-2 border-white">
          <span className="ml-2 text-white">New...</span>
        </TodoCard>
      )}
    </div>
  );
}
