import { createContext } from "react";

export type contextProps = {
  name: string;
  setName: (name: string) => void;

  address: string;
  setAddress: (address: string) => void;

  minPrice: string;
  setMinPrice: (minPrice: string) => void;

  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
};
export const ContextApp = createContext<contextProps>({} as contextProps);
