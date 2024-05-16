import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';

type ContextProps = {
  user: null | boolean;
  session: Session | null;
};

export const AuthContext = createContext<Partial<ContextProps>>({});
