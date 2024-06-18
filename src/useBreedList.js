import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  if (results.isLoading) {
    return [];
  }

  if (results.data.length == 0) {
    return [];
  }

  return results.data.breeds;
}
