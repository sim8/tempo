import React from 'react';
import Button from './basics/Button';
import TodoCard from './TodoCard';
import AbstractEditor, { EditorProps } from './AbstractEditor';

export enum EditorType {
  CREATE,
  UPDATE,
}

export default function TodoEditor({ ...editorProps }: EditorProps) {
  const { editorType } = editorProps;

  return (
    <AbstractEditor
      {...editorProps}
      render={({ inputProps, saveButtonProps, cancelButtonProps }) => (
        <>
          <TodoCard className="bg-slate-700/50 border-solid border-2 border-white">
            <span className="ml-2 text-white">
              <input
                {...inputProps}
                className="border-none outline-none bg-transparent"
                data-testid="todo-name-input"
              />
            </span>
          </TodoCard>
          <div>
            <Button {...saveButtonProps} className="bg-green-700">
              {editorType === EditorType.UPDATE ? 'Save' : 'Add'}
            </Button>
            <Button {...cancelButtonProps} className="bg-slate-700 ml-1">
              Cancel
            </Button>
          </div>
        </>
      )}
    />
  );
}
