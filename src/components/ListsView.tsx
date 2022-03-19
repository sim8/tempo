import React from 'react';
import classNames from 'classnames';

export default function ListsView() {
  const MOCK_LISTS = [
    'Inbox',
    'Backlog',
    'Code'
  ]
  const selectedList = MOCK_LISTS[0];
  return (
    <ul className="text-5xl m-20">
      {MOCK_LISTS.map(list => <li key={list} className={classNames('mb-8', {
        'text-white': list === selectedList,
        'text-slate-400': list !== selectedList,
      })}>{list}</li>)}
    </ul>
  );
}
