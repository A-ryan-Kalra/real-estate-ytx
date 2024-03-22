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
  content: string;
  like: boolean;
  postId: string;
  userId: string;
  updatedAt?: string;
  createdAt?: string;
}
