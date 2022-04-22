import React from 'react';
import useIsHovering from '../hooks/useIsHovering';

import { TodoList } from '../types';
import classNames from 'classnames';
import ListNameEditor from './ListNameEditor';

export default function ListAffordanceAndEditor({
  onCreate,
  onCancel,
  onStartCreating,
  isCreating,
}: {
  onCreate: (partialList: Partial<TodoList>) => void;
  onCancel: () => void;
  onStartCreating: () => void;
  isCreating: boolean;
}) {
  const [isHovering, mouseEventHandlers] = useIsHovering();

  if (isCreating) {
    return (
      <ListNameEditor onSave={name => onCreate({ name })} onCancel={onCancel} />
    );
  }
  return (
    <div
      className={classNames('text-slate-400 cursor-pointer', {
        'opacity-100': isHovering,
        'opacity-0': !isHovering,
      })}
      {...mouseEventHandlers}
      onClick={onStartCreating}
      data-testid="list-affordance"
    >
      ___
    </div>
  );
}
