function stringToColorPalette(inputString) {
  // Eine Array von möglichen Farbpaletten
  const colorPalettes = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
  ];

  // Einen Hash-Wert für den Eingabestring generieren
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Einen Index basierend auf dem Hash-Wert auswählen
  const index = Math.abs(hash) % colorPalettes.length;

  // Die ausgewählte Farbpalette zurückgeben
  return colorPalettes[index];
}

export default stringToColorPalette;
