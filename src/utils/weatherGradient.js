export const getGradientColors = (temp) => {
  if (temp <= 10) return ['#00c6ff', '#0072ff']; // cold
  if (temp <= 25) return ['#fefcea', '#f1da36']; // mild
  return ['#f83600', '#f9d423']; // hot
};
