import { useState } from "react";
import { TDirector } from "../constants/types";

export function useListOfDirector() {
  const [directors, setDirectors] = useState<TDirector[]>([]);
  const handleSubmitDirectors = (data: TDirector) => {
    setDirectors([...directors, data]);
  };

  return {
    directors,
    handleSubmitDirectors,
  };
}
