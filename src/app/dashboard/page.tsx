"use client";

import { useEffect, useState } from "react";
import style from "./dashboard.module.scss";
import { getProperties } from "@/services/propertiesService";
import { PropertyCard } from "@/components/propertyCard/PropertyCard";
import { useRouter } from "next/navigation";

type Props = {
  address: string;
  codeInternal: string;
  id: string;
  idOwner: number;
  idProperty: number;
  img: string;
  name: string;
  price: number;
  year: number;
};

const Dashboard = () => {
  const [filteredProperties, setFilteredProperties] = useState<Props[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const router = useRouter();

  const handleFetchProperties = async (name: string, address: string, minPrice: string, maxPrice: string) => {
    try {
      const data = await getProperties(name, address, minPrice, maxPrice);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };    

  useEffect(() => {
    handleFetchProperties(name, address, minPrice, maxPrice);
  }, [name, address, minPrice, maxPrice]);

  const handleReset = () => {
    setName("");
    setAddress("");
    setMinPrice("");
    setMaxPrice("");
    handleFetchProperties("", "", "", "");
  };

  console.log(filteredProperties)

  return (
    <div className={style.dashboard}>
      <header className={style.topbar}>
        <div className={`${style.container} ${style.topbar__inner}`}>
          <h1 className={style.brand}>Elite Properties</h1>

          <div className={style.topbar__right}>
            <span className={style.userPill}>
              <span className={style.userPill__email}>user@demo.com</span>
              <span className={style.userPill__role}>(user)</span>
            </span>
            <button onClick={handleLogout} className={`${style.btn} ${style.btnGhost}`}>Logout</button>
          </div>
        </div>
      </header>

      <main className={style.container}>
        <h2 className={style.pageTitle}>Properties</h2>

        <section className={`${style.card} ${style.filtersCard}`}>
          <div className={style.filtersGrid}>
            <div className={style.field}>
              <label htmlFor="f-name">Property Name</label>
              <input
                id="f-name"
                type="text"
                placeholder="Search by name..."
                className={style.input}
                onChange={handleName}
                value={name}
              />
            </div>

            <div className={style.field}>
              <label htmlFor="f-address">Address</label>
              <input
                id="f-address"
                type="text"
                placeholder="Search by address..."
                className={style.input}
                onChange={handleAddress}
                value={address}
              />
            </div>

            <div className={style.field}>
              <label htmlFor="f-min">Min Price</label>
              <input
                id="f-min"
                type="number"
                placeholder="Min price..."
                className={style.input}
                min={0}
                onChange={handleMinPrice}
                value={minPrice}
              />
            </div>

            <div className={style.field}>
              <label htmlFor="f-max">Max Price</label>
              <input
                id="f-max"
                type="number"
                placeholder="Max price..."
                className={style.input}
                min={0}
                onChange={handleMaxPrice}
                value={maxPrice}
              />
            </div>
          </div>

          <div className={style.filtersActions}>
            <button className={`${style.btn} ${style.btnPrimary}`}>
              Apply Filters
            </button>
            <button onClick={handleReset} className={`${style.btn} ${style.btnSecondary}`}>
              Clear Filters
            </button>
          </div>
        </section>

        <section className={style.grid}>
          {filteredProperties.map((p) => (
            <PropertyCard
              key={p.id}
              id={p.id}
              name={p.name}
              address={p.address}
              img={p.img}
              price={p.price}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
