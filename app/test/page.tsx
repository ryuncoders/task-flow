"use client";

import { useQuery } from "react-query";
import { fetchWorkItems } from "../(tabs)/goal/[id]/actions";

export default function Test() {
  const paramsId = 4;
  const { data: workItems, isLoading } = useQuery(
    ["workItems", paramsId],
    () => fetchWorkItems(paramsId),
    {
      staleTime: 6 * 10 * 1000,
    }
  );
  if (isLoading) {
    return <div>workItems is Loading ...</div>;
  }
  return <div></div>;
}
