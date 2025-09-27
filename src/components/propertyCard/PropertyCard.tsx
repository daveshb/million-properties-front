import React from 'react'
import Link from 'next/link'
import style from './propertyCard.module.scss'
import Image from 'next/image'

type PropertyCardProps = {
    address: string,
    id: string,
    img: string,
    name: string,
    price: number,
    beds?: number,
    bathsFull?: number,
    bathsHalf?: number,
    area?: number,
    status?: string,
    daysAgo?: number,
}

export const PropertyCard = (props: PropertyCardProps) => {
  return (
    <article className={style.propertyCard}>
      <div className={style.propertyCard__media}>
        <Image src={props.img} alt={props.name} width={500} height={300} />
        {props.status && <span className={style.badge}>{props.status}</span>}
        {props.daysAgo && <span className={style.chip}>{props.daysAgo} days ago</span>}
      </div>

      <div className={style.propertyCard__body}>
        <h3 className={style.propertyCard__title}>{props.name}</h3>

        <div className={style.propertyCard__meta}>
          <span className={style.address}>{props.address}</span>
          <span className={style.price}>
            {props.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })}
          </span>
        </div>

        <div className={style.propertyCard__stats}>
          <div className={style.stat}>
            {props.beds && <span className={style.stat__value}>{props.beds}</span>}
            <span className={style.stat__label}>Beds</span>
          </div>
          <div className={style.stat}>
            {props.bathsFull && <span className={style.stat__value}>{props.bathsFull}</span>}
            <span className={style.stat__label}>Full Baths</span>
          </div>
          <div className={style.stat}>
            {props.bathsHalf && <span className={style.stat__value}>{props.bathsHalf}</span>}
            <span className={style.stat__label}>Half Baths</span>
          </div>
          <div className={style.stat}>
            {props.area && <span className={style.stat__value}>
              {props.area.toLocaleString()} Sq. Ft.
            </span>}
            <span className={style.stat__label}>Area</span>
          </div>
        </div>

        <div className={style.propertyCard__actions}>
          <Link href={`/properties/${props.id}`} className={`${style.btn} ${style.btnLink}`} aria-label={`View details for ${props.name}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}