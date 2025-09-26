"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById } from "@/services/propertiesService";
import styles from "../properties.module.scss";

type PropertyTrace = {
  id: string;
  idProperty: number;
  dateSale: string;
  name: string;
  value: number;
  tax: number;
};

type Owner = {
  id: string;
  idOwner: number;
  name: string;
  email: string | null;
  phone: string | null;
};

type Property = {
  id: string;
  name: string;
  address: string;
  img: string;
  price: number;
  idProperty: number;
  codeInternal: string;
  year: number;
  idOwner: number;
  owner: Owner;
  propertyTraces: PropertyTrace[];
};

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        setError("Could not load the property details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

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
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => router.back()}>
              Back
            </button>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.card}>
          <div className={styles.propertyDetail}>
            <div>
              <img src={property.img} alt={property.name} className={styles.propertyImage} />
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


