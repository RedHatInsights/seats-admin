import { Context, PropsWithChildren, createContext, useContext } from 'react';
import { LicenseService, getService } from '../client/service';

type ServiceContextProps = {
  serviceName: string;
  baseUrl?: string;
};

export const ServiceContext = createContext<LicenseService | undefined>(
  undefined
);

function useRequiredContext<T>(context: Context<T>): NonNullable<T> {
  const resolved = useContext(context);

  if (resolved !== undefined && resolved !== null) {
    return resolved;
  }

  throw new Error(
    `No provider found for context, make sure it is included in your component hierarchy.`
  );
}

export const useService = () => useRequiredContext(ServiceContext);

export const ServiceContextProvider = ({
  serviceName,
  baseUrl,
  children,
}: PropsWithChildren<ServiceContextProps>) => {
  return (
    <ServiceContext.Provider value={getService(serviceName, baseUrl)}>
      {children}
    </ServiceContext.Provider>
  );
};
