"use client";

import Image from "next/image";
import styles from "../properties.module.scss";
import { usePropertyDetail } from "../usePropertyDetail";

export default function PropertyDetailPage() {
  const {
    property,
    loading,
    error,
    handleGoBack,
  } = usePropertyDetail();

  if (loading) {
    return (
      <main className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className={styles.container}>
        <div className={`${styles.alert} ${styles.alertError}`}>{error ?? "Not found"}</div>
      </main>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.topbar}>
        <div className={`${styles.container} ${styles.topbar__inner}`}>
          <h1 className={styles.brand}>Property Detail</h1>
          <div className={styles.topbar__right}>
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={handleGoBack}>
              Back
            </button>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.card}>
          <div className={styles.propertyDetail}>
            <div>
              <Image src={property.img} alt={property.name} className={styles.propertyImage} width={500} height={300} />
            </div>
            <div className={styles.propertyInfo}>
              <h2 className={styles.pageTitle}>{property.name}</h2>
              <div className={styles.propertyMeta}>
                <span className={styles.address}>{property.address}</span>
                <span className={styles.price}>
                  {property.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className={styles.propertyDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Property ID:</span>
                  <span className={styles.detailValue}>{property.idProperty}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Code:</span>
                  <span className={styles.detailValue}>{property.codeInternal}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Year:</span>
                  <span className={styles.detailValue}>{property.year}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Owner ID:</span>
                  <span className={styles.detailValue}>{property.idOwner}</span>
                </div>
              </div>

              {/* Owner Information */}
              <div className={styles.ownerSection}>
                <h3 className={styles.sectionTitle}>Owner Information</h3>
                <div className={styles.ownerDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Name:</span>
                    <span className={styles.detailValue}>{property.owner.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Owner ID:</span>
                    <span className={styles.detailValue}>{property.owner.idOwner}</span>
                  </div>
                  {property.owner.email && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Email:</span>
                      <span className={styles.detailValue}>{property.owner.email}</span>
                    </div>
                  )}
                  {property.owner.phone && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Phone:</span>
                      <span className={styles.detailValue}>{property.owner.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Traces */}
              {property.propertyTraces && property.propertyTraces.length > 0 && (
                <div className={styles.tracesSection}>
                  <h3 className={styles.sectionTitle}>Property History</h3>
                  <div className={styles.tracesList}>
                    {property.propertyTraces.map((trace) => (
                      <div key={trace.id} className={styles.traceItem}>
                        <div className={styles.traceHeader}>
                          <span className={styles.traceName}>{trace.name}</span>
                          <span className={styles.traceDate}>
                            {new Date(trace.dateSale).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.traceDetails}>
                          <div className={styles.traceValue}>
                            <span className={styles.detailLabel}>Value:</span>
                            <span className={styles.detailValue}>
                              {trace.value.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                          <div className={styles.traceTax}>
                            <span className={styles.detailLabel}>Tax:</span>
                            <span className={styles.detailValue}>
                              {trace.tax.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


