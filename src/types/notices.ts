export interface NoticeFilters {
  keyword: string;
  category: string;
  sex: string;
  species: string;
  locationId: string;
  byPopularity?: boolean;
  byPrice?: boolean;
  page: number;
}

export interface City {
  _id: string;
  useCounty?: string;
  stateEn?: string;
  cityEn: string;
  countyEn?: string;
}

export interface Note {
  _id: string;
  species: string;
  category: string;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
}

export interface Pet {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
}
