import { PropsWithChildren, createContext, useState } from 'react';

interface Context<T = unknown> {
  selected?: T;
  setSelected: (value: T) => void;
}

export const RadioContext = createContext<Context>({
  selected: null,
  setSelected() {},
});

export const RadioContextProvider = ({ children }: PropsWithChildren) => {
  const [selected, setSelected] = useState<unknown>('');

  const handleState = (v: unknown) => {
    setSelected(v);
  };
  return (
    <RadioContext.Provider value={{ selected, setSelected: handleState }}>
      {children}
    </RadioContext.Provider>
  );
};
