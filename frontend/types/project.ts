export interface Project {
  id: number;
  name: string;
  type: string;
  location: string;
  locationLink?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFormData {
  name: string;
  type: string;
  location: string;
  locationLink?: string;
  image: File | null;
}
