export function formatDate(createdAt) {
  const date = new Date(createdAt);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate.replace(",", "")} ${formattedTime}`;
}
