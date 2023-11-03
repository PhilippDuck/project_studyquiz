function formatUnixTimestamp(unixTimestamp) {
  // Wenn Ihr Zeitstempel in Sekunden ist, multiplizieren Sie ihn mit 1000
  const date = new Date(unixTimestamp);

  // Formatieren Sie das Datum wie gewünscht
  const formattedDate = date.toLocaleDateString("de-DE"); // gibt z.B. "30.10.2023" aus
  const formattedTime = date.toLocaleTimeString("de-DE"); // gibt z.B. "17:45:00" aus

  return `${formattedDate} ${formattedTime}`;
}
export default formatUnixTimestamp;
