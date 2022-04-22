import { useReducer, useCallback } from 'react';
import { TodoList, Todo } from '../types';

const INITIAL_STATE = {
  lists: [
    {
      name: 'Inbox',
      todos: [
        'Read emails',
        'Make progress on prototype',
        'Rough structure for presentation',
        'Plan team celebration',
      ],
    },
    {
      name: 'Backlog',
      todos: ['Biggy thinky', 'Rethink org structure'],
    },
  ],
  selectedListIndex: 0,
  isCreating: false,
  isUpdating: false,
};

interface ListsState {
  lists: TodoList[];
  selectedListIndex: number;
  isCreating: boolean;
  isUpdating: boolean;
}

enum ActionType {
  CREATE,
  UPDATE,
  DELETE,
  SELECT,
  START_CREATING,
  START_UPDATING,
  STOP_EDITING,
}

interface Action {
  type: ActionType;
  payload: unknown;
}

function listsReducer(
  state: ListsState,
  { type, payload }: Action
): ListsState {
  switch (type) {
    case ActionType.CREATE: {
      return {
        ...state,
        lists: state.lists.concat({
          todos: [],
          ...(payload as object),
        } as TodoList),
        selectedListIndex: state.lists.length + 1,
        isCreating: false,
      };
    }
    case ActionType.UPDATE: {
      const { index, fieldsToUpdate } = payload as {
        index: number;
        fieldsToUpdate: Partial<TodoList>;
      };
      return {
        ...state,
        lists: Object.assign([], state.lists, {
          [index]: {
            ...state.lists[index],
            ...fieldsToUpdate,
          },
        }),
        isUpdating: false,
      };
    }
    case ActionType.DELETE: {
      return {
        ...state,
        lists: state.lists.filter((__value, i) => i !== (payload as number)),
        selectedListIndex: state.selectedListIndex - 1,
        isUpdating: false,
      };
    }
    case ActionType.SELECT: {
      return {
        ...state,
        selectedListIndex: payload as number,
        isUpdating: state.selectedListIndex === payload ? true : false,
      };
    }
    case ActionType.START_CREATING: {
      return {
        ...state,
        isCreating: true,
        isUpdating: false,
      };
    }
    case ActionType.START_UPDATING: {
      return {
        ...state,
        isUpdating: true,
        isCreating: false,
      };
    }
    case ActionType.STOP_EDITING: {
      return {
        ...state,
        isUpdating: false,
        isCreating: false,
      };
    }
    default:
      return state;
  }
}

export default function useLists(): {
  lists: TodoList[];
  selectedListIndex: number;
  isCreating: boolean;
  isUpdating: boolean;
  onCreateList: (partialList: Partial<TodoList>) => void;
  onUpdateList: (payload: {
    index: number;
    fieldsToUpdate: Partial<TodoList>;
  }) => void;
  onDeleteList: (index: number) => void;
  onSelectList: (index: number) => void;
  onStartCreating: () => void;
  onStartUpdating: (index: number) => void;
  onStopEditing: () => void;
} {
  const [{ lists, selectedListIndex, isCreating, isUpdating }, dispatch] =
    useReducer(listsReducer, INITIAL_STATE);

  const makeAction = (actionType: ActionType) => (payload?: unknown) =>
    dispatch({ type: actionType, payload });

  return {
    lists,
    selectedListIndex,
    isCreating,
    isUpdating,
    onCreateList: makeAction(ActionType.CREATE),
    onUpdateList: makeAction(ActionType.UPDATE),
    onDeleteList: makeAction(ActionType.DELETE),
    onSelectList: makeAction(ActionType.SELECT),
    onStartCreating: makeAction(ActionType.START_CREATING),
    onStartUpdating: makeAction(ActionType.START_UPDATING),
    onStopEditing: makeAction(ActionType.STOP_EDITING),
  };
}
