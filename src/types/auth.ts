export interface LoginRequest
{
    password:string,
    email:string
}
export interface User{
    email:string
    fullName:string
    id:number
    role:"Admin"|"User"
}
export interface LoginResponse {
    accessToken: string;
    tokenType: "Bearer";
    expiresIn: number;
    user: User;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AdminUser extends User {
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}

