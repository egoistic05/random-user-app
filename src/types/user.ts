export interface User {
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  phone: string;
  gender: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    country: string;
  };
}

export interface UserApiResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
} 