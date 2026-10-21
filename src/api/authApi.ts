
import { api } from './api';
import type { LoginRequest, LoginResponse, RegisterRequest, User, } from '../types/auth';

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        '/auth/login',
        data
    );

    return response.data;
};

export const register = async (
    data: RegisterRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        '/auth/register',
        data
    );

    return response.data;
};

export const getMe = async (): Promise<User> => {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data.user;
};
