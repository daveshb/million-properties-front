"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById } from "@/services/propertiesService";
import styles from "../properties.module.scss";

type Property = {
  id: string;
  name: string;
  address: string;
  img: string;
  price: number;
  beds?: number;
  bathsFull?: number;
  bathsHalf?: number;
  area?: number;
  status?: string;
  year?: number;
  codeInternal?: string;
  idOwner?: number;
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

              <div className={styles.propertyCard__stats}>
                <div className={styles.stat}>
                  {property.beds && <span className={styles.stat__value}>{property.beds}</span>}
                  <span className={styles.stat__label}>Beds</span>
                </div>
                <div className={styles.stat}>
                  {property.bathsFull && <span className={styles.stat__value}>{property.bathsFull}</span>}
                  <span className={styles.stat__label}>Full Baths</span>
                </div>
                <div className={styles.stat}>
                  {property.bathsHalf && <span className={styles.stat__value}>{property.bathsHalf}</span>}
                  <span className={styles.stat__label}>Half Baths</span>
                </div>
                <div className={styles.stat}>
                  {property.area && (
                    <span className={styles.stat__value}>{property.area.toLocaleString()} Sq. Ft.</span>
                  )}
                  <span className={styles.stat__label}>Area</span>
                </div>
              </div>

              <div className={styles.propertyDetails}>
                {property.status && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status:</span>
                    <span className={styles.detailValue}>{property.status}</span>
                  </div>
                )}
                {property.year && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Year:</span>
                    <span className={styles.detailValue}>{property.year}</span>
                  </div>
                )}
                {property.codeInternal && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Code:</span>
                    <span className={styles.detailValue}>{property.codeInternal}</span>
                  </div>
                )}
                {property.idOwner !== undefined && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Owner ID:</span>
                    <span className={styles.detailValue}>{property.idOwner}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


