export interface ProjectUpdate {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  type: string;
  location: string;
  locationLink?: string;
  image?: string;
  updates?: ProjectUpdate[];
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
