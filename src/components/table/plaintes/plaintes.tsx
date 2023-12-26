"use client";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
type SearchContextProps = {
  searchSNumber: string | null;
  setSearchSNumber: (searchSNumber: string) => void;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const PlaintesProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [petitionHasFiled, setPetitionHasFiled] = useState<string | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchSNumber: search,
        setSearchSNumber: setSearch,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

const Plaintes = ({ children }: PropsWithChildren) => {
  return <PlaintesProvider>{children}</PlaintesProvider>;
};

const useSearchTableContext = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (context) {
    return context;
  }
  throw new Error("context must be used within an SearchContextProvider");
};
export { useSearchTableContext, Plaintes };
