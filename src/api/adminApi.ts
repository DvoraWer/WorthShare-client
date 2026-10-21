import type { AdminUser } from '../types/auth';
import type { AdminCategory, CategoryInput } from '../types/category';
import type { AdminRecommendation, Paginated } from '../types/recommendation';
import { api } from './api';

export const getPendingSponsored=async():Promise<Paginated<AdminRecommendation>>=>
{
    const response=await api.get<Paginated<AdminRecommendation>>('/admin/recommendations/pending-sponsored');
    return response.data;
}

export const approveSponsored=async(id: number, expectedUpdatedAt: string):Promise<AdminRecommendation>=>
{
    const response=await api.put<AdminRecommendation>(`/admin/recommendations/${id}/approve-sponsored`,{expectedUpdatedAt});
    return response.data;
}

export const rejectSponsored=async(id: number, expectedUpdatedAt: string, rejectionReason:string):Promise<AdminRecommendation>=>
{
    const response=await api.put<AdminRecommendation>(`/admin/recommendations/${id}/reject-sponsored`,{expectedUpdatedAt,rejectionReason});
    return response.data;
}

export const getUsers=async():Promise<Paginated<AdminUser>>=>
{
    const response=await api.get<Paginated<AdminUser>>('/admin/users');
    return response.data
}

export const updateUserStatus=async(id:number,isActive:boolean):Promise<AdminUser>=>
{
    const response=await api.patch<AdminUser>(`/admin/users/${id}/status`,{isActive});
    return response.data
}

export const updateUserRole=async(id:number,role:'User'|'Admin'):Promise<AdminUser>=>
{
    const response=await api.patch<AdminUser>(`/admin/users/${id}/role`,{role});
    return response.data;
}

export const getAdminCategories=async():Promise<Paginated<AdminCategory>>=>
{
    const response=await api.get<Paginated<AdminCategory>>('/admin/categories');
    return response.data;
}

export const createCategory=async(data:CategoryInput):Promise<AdminCategory>=>
{
    const response=await api.post<AdminCategory>('/admin/categories',data);
    return response.data;
}

export const updateCategory=async(id:number,data:CategoryInput):Promise<AdminCategory>=>
{
    const response=await api.put<AdminCategory>(`/admin/categories/${id}`,data);
    return response.data;
}

export const updateCategoryStatus=async(id:number,isActive:boolean):Promise<AdminCategory>=>
{
    const response=await api.patch<AdminCategory>(`/admin/categories/${id}/status`,{isActive});
    return response.data;
}

