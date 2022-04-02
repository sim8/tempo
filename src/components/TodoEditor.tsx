import React, { useState, useCallback } from 'react';
import Button from './basics/Button';
import TodoCard from './TodoCard';
import { Todo } from '../types';

export enum EditorType {
  CREATE,
  UPDATE,
}

export default function TodoEditor({
  onSave,
  onCancel,
  editorType = EditorType.CREATE,
  initialState = '',
}: {
  onSave: (todo: Todo) => void;
  onCancel: () => void;
  editorType?: EditorType;
  initialState?: Todo;
}) {
  const [editorContent, setEditorContent] = useState<Todo>(initialState);
  const onClickSave = useCallback(() => {
    if (editorContent) {
      onSave(editorContent);
    }
  }, [onSave, editorContent]);

  const onBlur = useCallback(() => {
    if (editorContent === initialState) {
      onCancel();
    }
  }, [initialState, editorContent, onCancel]);

  return (
    <>
      <TodoCard className="bg-slate-700/50 border-solid border-2 border-white">
        <span className="ml-2 text-white">
          <input
            type="text"
            className="border-none outline-none bg-transparent"
            onBlur={onBlur}
            onChange={e => setEditorContent(e.target.value)}
            value={editorContent}
            data-testid="todo-name-input"
            autoFocus
          />
        </span>
      </TodoCard>
      <div>
        <Button className="bg-green-700" onClick={onClickSave}>
          {editorType === EditorType.UPDATE ? 'Save' : 'Add'}
        </Button>
        <Button className="bg-slate-700 ml-1" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
}
