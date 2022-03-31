import { useState } from 'react';
import { Todos, Todo, TodoList } from '../types';

interface TodosState {
  todos: Todos;
  selectedTodoIndex: number;
}

enum ActionType {
  CREATE,
  UPDATE,
  DELETE,
  SELECT,
  MARK_COMPLETE,
}

interface Action {
  type: ActionType;
  payload: unknown;
}

function todosReducer(
  state: TodosState,
  { type, payload }: Action
): TodosState {
  switch (type) {
    case ActionType.CREATE: {
      return {
        ...state,
        todos: state.todos.concat(payload as Todo),
        selectedTodoIndex: state.todos.length + 1,
      };
    }
    case ActionType.UPDATE: {
      const { index, list } = payload as { index: number; list: Todo };
      return {
        ...state,
        todos: Object.assign([], state.todos, { [index]: list }),
      };
    }
    case ActionType.DELETE:
    case ActionType.MARK_COMPLETE: {
      // TODO animation etc for complete
      return {
        ...state,
        todos: state.todos.filter((__value, i) => i !== (payload as number)),
        selectedTodoIndex: state.selectedTodoIndex - 1,
      };
    }
    case ActionType.SELECT: {
      return {
        ...state,
        selectedTodoIndex: payload as number,
      };
    }
    default:
      return state;
  }
}

export default function useTodos(
  todos: Todo[],
  onUpdateTodos: (nextTodos: Todo[]) => void
): {
  selectedTodoIndex: number;
  onUpdateTodo: (payload: { index: number; todo: Todo }) => void;
  onCreateTodo: (todo: Todo) => void;
  onDeleteTodo: (index: number) => void;
  onMarkTodoComplete: (index: number) => void;
  onSelectTodo: (index: number) => void;
} {
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(0);

  const makeAction = (actionType: ActionType) => (payload: unknown) => {
    const nextState = todosReducer(
      { todos, selectedTodoIndex },
      { type: actionType, payload }
    );
    setSelectedTodoIndex(nextState.selectedTodoIndex);
    onUpdateTodos(nextState.todos);
  };

  return {
    selectedTodoIndex,
    onUpdateTodo: makeAction(ActionType.UPDATE),
    onCreateTodo: makeAction(ActionType.CREATE),
    onDeleteTodo: makeAction(ActionType.DELETE),
    onMarkTodoComplete: makeAction(ActionType.MARK_COMPLETE),
    onSelectTodo: makeAction(ActionType.SELECT),
  };
}
