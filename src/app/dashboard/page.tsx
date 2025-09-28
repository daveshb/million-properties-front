"use client";

import { memo, useMemo } from "react";
import style from "./dashboard.module.scss";
import { PropertyCard } from "@/components/propertyCard/PropertyCard";
import { Pagination } from "@/components/pagination/Pagination";
import { ErrorAlert } from "@/components/error/ErrorAlert";
import { useDashboard } from "./useDashboard";

const Dashboard = memo(() => {
  const {
    filteredProperties,
    pagination,
    name,
    address,
    minPrice,
    maxPrice,
    loading,
    error,
    isRetrying,
    handleName,
    handleAddress,
    handleMinPrice,
    handleMaxPrice,
    handlePageChange,
    handleLogout,
    handleReset,
    handleRetry,
  } = useDashboard();

  // Memoize the properties list to prevent unnecessary re-renders
  const propertiesList = useMemo(() => {
    return filteredProperties.map((p) => (
      <PropertyCard
        key={p.id}
        id={p.id}
        name={p.name}
        address={p.address}
        img={p.img}
        price={p.price}
      />
    ));
  }, [filteredProperties]);

  return (
    <div className={style.dashboard}>
      <header className={style.topbar}>
        <div className={`${style.container} ${style.topbar__inner}`}>
          <h1 className={style.brand}>Million Properties</h1>

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

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            {isRetrying ? 'Reintentando...' : 'Loading properties...'}
          </div>
        )}
        
        <section className={style.grid}>
          {propertiesList}
        </section>

        <Pagination
          currentPage={pagination.pageNumber}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalCount}
          itemsPerPage={pagination.pageSize}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';


export default Dashboard;
