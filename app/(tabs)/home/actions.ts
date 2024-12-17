export async function fetchWeekWorkItems() {
  const response = await fetch("/api/workItem/week", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if (response.success) {
    return response.weekWorkItems;
  } else {
    console.error("response api error, week workItem");
  }
}
