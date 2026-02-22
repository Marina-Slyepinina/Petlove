export type Categories = 'found' | 'free' | 'lost' | 'sell';
export type Sex = 'female' | 'male' | 'multiple' | 'unknown';
export type Species = 'dog'
  | 'cat'
  | 'monkey'
  | 'bird'
  | 'snake'
  | 'turtle'
  | 'lizard'
  | 'frog'
  | 'fish'
  | 'ants'
  | 'bees'
  | 'butterfly'
  | 'spider'
  | 'scorpion';

export interface Note {
  _id: string;
  species: Species;
  category: Categories;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: Sex;
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
  species: Species;
  birthday: string;
  sex: Sex;
  createdAt: string;
  updatedAt: string;
}