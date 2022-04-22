import React from 'react';
import Button from './basics/Button';
import AbstractEditor, { EditorProps } from './AbstractEditor';

export enum EditorType {
  CREATE,
  UPDATE,
}

export default function ListNameEditor({ ...editorProps }: EditorProps) {
  const { editorType = EditorType.CREATE } = editorProps;

  return (
    <AbstractEditor
      {...editorProps}
      render={({ inputProps, saveButtonProps, cancelButtonProps }) => (
        <>
          <input
            {...inputProps}
            className="border-none outline-none bg-transparent"
            data-testid="list-name-input"
          />
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
