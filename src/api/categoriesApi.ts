import type { Category} from "../types/category";
import type { Paginated} from '../types/recommendation';

import { api } from './api';
export const getCategories = async (): Promise<Paginated<Category>> => {
    const response = await api.get<Paginated<Category>>('/categories');
    return response.data;
};