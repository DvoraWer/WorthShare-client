import { api } from './api';
import type { OwnerRecommendation, Paginated, Recommendation, RecommendationFilters, RecommendationsInput, SponsorshipInput } from '../types/recommendation';

export const getRecommendations = async (filters:RecommendationFilters={}): Promise<Paginated<Recommendation>> => {
    const response = await api.get<Paginated<Recommendation>>('/recommendations', { params: filters });
    return response.data;
};

export const createRecommendation=async(data:RecommendationsInput):Promise<OwnerRecommendation>=>
{
    const response=await api.post<OwnerRecommendation>('/recommendations',data);
    return response.data
}

export const updateRecommendation=async(id:number,data:RecommendationsInput):Promise<OwnerRecommendation>=>
{
    const response=await api.put<OwnerRecommendation>(`/recommendations/${id}`,data);
    return response.data
}
export const getMyRecommendations=async(filters:RecommendationFilters={}): Promise<Paginated<OwnerRecommendation>>=>
{
const response=await api.get<Paginated<OwnerRecommendation>>('/recommendations/mine',{params:filters})
return response.data
}

export const deleteRecommendation=async(id:number):Promise<void>=>
{
    await api.delete<void>(`/recommendations/${id}`);
}

export const requestSponsored=async(id:number,data:SponsorshipInput):Promise<OwnerRecommendation>=>
{
    const response=await api.post<OwnerRecommendation>(`/recommendations/${id}/request-sponsored`,data)
    return response.data;
}
