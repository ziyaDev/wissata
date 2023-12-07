"use client";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
type SearchContextProps = {
  searchFullName: string | null;
  petitionHasFiled: string | null;
  setSearchFullName: (searchFullName: string) => void;
  setPetitionHasFiled: (petitionHasFiled: string | null) => void;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const ReceptionsProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [petitionHasFiled, setPetitionHasFiled] = useState<string | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchFullName: search,
        setSearchFullName: setSearch,
        petitionHasFiled: petitionHasFiled,
        setPetitionHasFiled: setPetitionHasFiled,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

const Receptions = ({ children }: PropsWithChildren) => {
  return <ReceptionsProvider>{children}</ReceptionsProvider>;
};

const useSearchTableContext = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (context) {
    return context;
  }
  throw new Error("context must be used within an SearchContextProvider");
};
export { useSearchTableContext, Receptions };
