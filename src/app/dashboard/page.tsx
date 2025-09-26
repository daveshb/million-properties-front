"use client";

import { useEffect, useState } from "react";
import style from "./dashboard.module.scss";
import { getProperties } from "@/services/propertiesService";
import { PropertyCard } from "@/components/propertyCard/PropertyCard";

type Props = {
  address: string;
  id: string;
  img: string;
  name: string;
  price: number;
};

const Dashboard = () => {
  const [filteredProperties, setFilteredProperties] = useState<Props[]>([]);
  const [name, setName] = useState("");

  const handleFetchProperties = async (name: string) => {
    try {
      const data = await getProperties(name);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  useEffect(() => {
    handleFetchProperties(name);
  }, [name]);

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
            <button className={`${style.btn} ${style.btnGhost}`}>Logout</button>
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
              />
            </div>

            <div className={style.field}>
              <label htmlFor="f-address">Address</label>
              <input
                id="f-address"
                type="text"
                placeholder="Search by address..."
                className={style.input}
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
              />
            </div>
          </div>

          <div className={style.filtersActions}>
            <button className={`${style.btn} ${style.btnPrimary}`}>
              Apply Filters
            </button>
            <button className={`${style.btn} ${style.btnSecondary}`}>
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
