import { useCollectionContext } from "../context/collection-context";

export const useCollection = () => {
  const context = useCollectionContext();
  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
};
