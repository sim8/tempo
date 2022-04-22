import React, { useState, useCallback, useMemo, ReactNode } from 'react';

export enum EditorType {
  CREATE,
  UPDATE,
}

export interface EditorProps {
  onSave: (value: string) => void;
  onCancel: () => void;
  editorType?: EditorType;
  initialState?: string;
}

interface AbstractEditorProps extends EditorProps {
  render: ({
    inputProps,
    saveButtonProps,
    cancelButtonProps,
  }: {
    inputProps: object;
    saveButtonProps: object;
    cancelButtonProps: object;
  }) => ReactNode;
}

export default function AbstractEditor({
  onSave,
  onCancel,
  render,
  initialState = '',
}: AbstractEditorProps) {
  const [editorContent, setEditorContent] = useState<string>(initialState);
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

  const rendered = useMemo(
    () =>
      render({
        inputProps: {
          type: 'text',
          className: 'border-none outline-none bg-transparent',
          onBlur,
          onChange: (e: React.FormEvent<HTMLInputElement>) =>
            setEditorContent(e.currentTarget.value),
          value: editorContent,
          autoFocus: true,
        },
        saveButtonProps: {
          onClick: onClickSave,
        },
        cancelButtonProps: {
          onClick: onCancel,
        },
      }),
    [editorContent, onBlur, onClickSave, onCancel, render]
  );

  return <>{rendered}</>;
}
