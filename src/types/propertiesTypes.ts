export interface Property {
  id: string;
  name: string;
  address: string;
  img: string;
  price: number;
}

export interface PropertyDetail extends Property {
  idProperty: number;
  codeInternal: string;
  year: number;
  idOwner: number;
  owner: {
    id: string;
    idOwner: number;
    name: string;
    email: string | null;
    phone: string | null;
  };
  propertyTraces: {
    id: string;
    idProperty: number;
    dateSale: string;
    name: string;
    value: number;
    tax: number;
  }[];
}

export interface PaginatedResponse {
  items: Property[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface PropertiesFilters {
  name?: string;
  address?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}