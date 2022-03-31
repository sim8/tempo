import React, { useState, useCallback } from 'react';
import useIsHovering from '../hooks/useIsHovering';
import Button from './basics/Button';
import TodoCard from './TodoCard';
import { Todo } from '../types';
import classNames from 'classnames';

export default function TodoAffordanceAndEditor({
  onCreate,
}: {
  onCreate: (todo: Todo) => void;
}) {
  const [isHovering, mouseEventHandlers] = useIsHovering();
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const onAdd = useCallback(() => {
    onCreate(editorContent);
    setEditorContent('');
    setIsEditing(false);
  }, [onCreate, editorContent]);
  const onCancel = useCallback(() => {
    setEditorContent('');
    setIsEditing(false);
  }, []);
  if (isEditing) {
    return (
      <>
        <TodoCard className="bg-slate-700/50 border-solid border-2 border-white">
          <span className="ml-2 text-white">
            <input
              type="text"
              className="border-none outline-none bg-transparent"
              onBlur={() => setIsEditing(Boolean(editorContent))}
              onChange={e => setEditorContent(e.target.value)}
              value={editorContent}
              autoFocus
            />
          </span>
        </TodoCard>
        <div>
          <Button className="bg-green-700" onClick={onAdd}>
            Add
          </Button>
          <Button className="bg-slate-700 ml-1" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </>
    );
  }
  return (
    <div
      className={classNames('grow relative', {
        'cursor-pointer': isHovering,
      })}
      {...mouseEventHandlers}
      onClick={() => setIsEditing(true)}
    >
      {isHovering && (
        <TodoCard className="bg-slate-700/50 border-dashed border-2 border-white">
          <span className="ml-2 text-white">New...</span>
        </TodoCard>
      )}
    </div>
  );
}
