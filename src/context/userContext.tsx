import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react';

import axios from 'axios';

import type { User } from '../types/auth';
import { getMe } from '../api/authApi';

interface UserContextType {
  isLoading: boolean;
setIsLoading: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider=({ children }: UserProviderProps) =>{
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    const restoreUser=async()=>
    {
      const token=localStorage.getItem('accessToken');
      if(!token)
      {
        setIsLoading(false);
        return;
      }
      try{
        const me = await getMe();
        setUser(me);
      }
      catch(error)
      {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem('accessToken');
        }
      }
      finally{
        setIsLoading(false);
      }
    };
    restoreUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser,isLoading,setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}