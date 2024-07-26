import { useState } from "react";
import { TDirector } from "../constants/types";
import { copy } from "@/lib/utils";

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
