export interface FormDataProps {
  email?: string;
  password?: string;
  username?: string;
  profilePicture?: string;
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
}
