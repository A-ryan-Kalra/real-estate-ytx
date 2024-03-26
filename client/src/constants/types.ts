export interface FormDataProps {
  email?: string;
  password?: string;
  username?: string;
  profilePicture?: string;
  updatedAt?: string;
  createdAt?: string;
  isAdmin?: string;
}

export interface ListingDataProps {
  address: string;
  name: string;
  description: string;
  bathrooms: number;
  bedrooms: number;
  discountPrice?: number;
  regularPrice: number;
  furnished?: boolean;
  offer?: boolean;
  parking?: boolean;
  type?: string;
  userRef: string;
  imageUrls: string[];
  __v?: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentProps {
  _id?: string;
  content: string;
  likes?: string[];
  postId: string;
  userId: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface SearchProps {
  limit?: string;
  startIndex?: string;
  offer?: boolean;
  furnished?: boolean;
  parking?: boolean;
  type?: string;
  searchTerm?: string;
  sort?: string;
  order?: string;
}
