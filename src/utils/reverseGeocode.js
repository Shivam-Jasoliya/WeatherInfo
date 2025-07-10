export const getCityFromCoords = async (lat, lon) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
  const json = await res.json();
  return json.address.city || json.address.town || json.address.village || 'Unknown';
};
