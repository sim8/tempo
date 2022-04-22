import React, { useEffect } from 'react';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}

const PersistenceContext = React.createContext({});

export default function PersistenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   // console.log(window.electron.store.get('foo'));
  //   // electron.store.set('foo', 'bar');
  // }, []);
  // const storeRef = useRef(new Store());
  return (
    <PersistenceContext.Provider value={{}}>
      {children}
    </PersistenceContext.Provider>
  );
}
