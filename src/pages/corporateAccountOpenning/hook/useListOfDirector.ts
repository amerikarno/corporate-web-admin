import { useState } from "react";
import { Person, TDirector } from "../constants/types";

export function useListOfDirector() {
  const [directors, setDirectors] = useState<TDirector[]>([]);
  const handleSubmitDirectors = (data: Person) => {
    console.log(data);
  };

  return {
    directors,
    handleSubmitDirectors,
    setDirectors,
  };
}
