export function generateCurrentTime() {
  const currentTime = new Date();


  const formattedTime = currentTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formattedTime
}