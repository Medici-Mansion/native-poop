import { PropsWithChildren, createContext, useState } from 'react';

interface Context<T = unknown> {
  selected?: T;
  setSelected: (value: T) => void;
}

interface RadioGroupProps {
  defaultValue?: unknown;
  onChangeValue?: (value: unknown) => void;
  setStep?: (step: number) => void;
  step?: number;
}

export const RadioContext = createContext<Context>({
  selected: null,
  setSelected() {},
});

export const RadioContextProvider = ({
  children,
  defaultValue,
  onChangeValue,
  setStep,
  step,
}: PropsWithChildren<RadioGroupProps>) => {
  const [selected, setSelected] = useState<unknown>(defaultValue || '');
  const handleState = (v: unknown) => {
    setSelected(v);
    onChangeValue && onChangeValue(v);
    setStep && step && setStep(step + 1);
  };
  return (
    <RadioContext.Provider value={{ selected, setSelected: handleState }}>
      {children}
    </RadioContext.Provider>
  );
};
