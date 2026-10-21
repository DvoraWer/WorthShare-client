import { api } from './api';
import type { Paginated, Recommendation} from '../types/recommendation';

export const getFavorites=async():Promise<Paginated<Recommendation>>=>
{
    const response=await api.get<Paginated<Recommendation>>('/recommendations/favorites');
    return response.data;
}

export const getFavoriteIds=async():Promise<{ids:number[]}>=>{
const response=await api.get<{ids:number[]}>('/recommendations/favorites/ids');
return response.data;
}

export const addFavorite=async(id:number):Promise<void>=>
{
    await api.post<void>(`/recommendations/${id}/favorite`);
}

export const removeFavorite=async(id:number):Promise<void>=>
{
    await api.delete<void>(`/recommendations/${id}/favorite`);
}