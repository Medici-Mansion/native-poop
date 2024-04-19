import { createRef } from 'react';

type useRefsOptions<T extends string> = T[];
type keyType<T extends string> = `${T}Ref`;
type Refs<T extends string> = Record<keyType<T>, React.RefObject<any>>;

export function useRefs<T extends string>(options: useRefsOptions<T>): Refs<T> {
  const refsObject = {} as { [key: string]: React.RefObject<any> };

  options.forEach(key => {
    refsObject[`${key}Ref`] = createRef<any>();
  });

  return refsObject as Refs<T>;
}
