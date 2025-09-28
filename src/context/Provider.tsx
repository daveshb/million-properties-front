'use client';
import { JSX, useState } from "react";
import { ContextApp } from "./Context";

interface props {
  children: JSX.Element | JSX.Element[];
}

export const ProviderContext = ({ children }: props) => {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <ContextApp.Provider
      value={{
        name,
        setName,
        address,
        setAddress,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};