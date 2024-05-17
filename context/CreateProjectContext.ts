import { createContext } from 'react';

type CreateProjectProps = {
  refetchProjects: Function;
};

export const CreateProjectContext = createContext<Partial<CreateProjectProps>>({});
