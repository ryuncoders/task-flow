"use server";

export async function fetchWorkItems(goalId: number) {
  const response = await fetch(`/api/workItem/${goalId}`).then((res) =>
    res.json()
  );
  if (response.success) {
    return response.workItems;
  } else {
    return console.error("fetch workItem api error");
  }
}
