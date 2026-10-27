import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

import type { User } from '../types/auth';

interface UserContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);
