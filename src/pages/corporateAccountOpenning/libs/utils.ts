export function formatDateToIsoString(date: Date): string {
  const isoString = date.toISOString();
  const formattedDate = isoString.replace(/\.\d{3}Z$/, "+00:00");
  return formattedDate;
}

export const serializeJuristicType = (juristicType: string) => {};
