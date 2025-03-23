import { api, handleError } from '@/lib/axios';
import { Category, Property, SubCategory } from '@/types/types';
import { AxiosError, AxiosResponse } from 'axios';

// Fetch main categories
export const fetchMainCategories = async (): Promise<Category[] | null> => {
  try {
    const response: AxiosResponse<{ data: { categories: Category[] } }> = await api.get('/all-categories/web');
    return response.data.data.categories;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Fetch subcategories by category ID
export const fetchSubCategories = async (categoryId: number): Promise<SubCategory[] | null> => {
  try {
    const response: AxiosResponse<{ data: SubCategory[] }> = await api.get(`/properties/${categoryId}`);
    return response.data.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Fetch properties by option ID
export const fetchProperties = async (optionId: number): Promise<Property[] | null> => {
  try {
    const response: AxiosResponse<{ data: Property[] }> = await api.get(`/option-properties/${optionId}`);
    return response.data.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};