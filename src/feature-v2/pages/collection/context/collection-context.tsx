import React, { createContext, useContext, useEffect, useState } from "react";
import { collectionService } from "../service/collection.service";
import type { CollectionResponse, Character } from "../service/collection.service";

interface CollectionContextType {
  data: CollectionResponse | null;
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  fetchCollection: (characterId?: string) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType>({
  data: null,
  characters: [],
  isLoading: false,
  error: null,
  fetchCollection: async () => { },
});

// eslint-disable-next-line react-refresh/only-export-components
export const useCollectionContext = () => useContext(CollectionContext);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<CollectionResponse | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = async (characterId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await collectionService.getCollection(characterId);
      if (response.data) {
        setData(response.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch collection data:", err);
      setError(err.message || "Failed to fetch collection data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await collectionService.getCharacters();
      if (response.data) {
        setCharacters(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch characters:", err);
    }
  };

  useEffect(() => {
    fetchCharacters();
    // derived initial collection fetch will be handled by UI selecting the first tab usually, 
    // but we can leave the default fetch here if we want a "default" state. 
    // However, index.tsx logic:
    // useEffect(() => { if (characters.length > 0 && !selectedTab) { ... fetchCollection(first) } }, ...)
    // So we can remove the immediate fetchCollection() here to avoid double fetch, 
    // OR keep it to ensure data is populated if no character selected.
    // The user requirement implies collection is dependent on character. 
    // I'll leave fetchCollection() call here for safety/default (maybe no character ID = all?), 
    // but the UI will likely override it shortly after.
    fetchCollection();
  }, []);

  return (
    <CollectionContext.Provider
      value={{
        data,
        characters,
        isLoading,
        error,
        fetchCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
