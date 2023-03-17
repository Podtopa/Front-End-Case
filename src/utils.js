export const getDuration = (seconds) => {
   const hours = Math.floor(seconds / 3600);
   const min = Math.floor((seconds - hours * 3600) / 60);
   const sec = seconds % 60;

   return [
     hours ? `${hours}h` : '',
     min ? `${min}m` : '',
     `${sec}s`,
   ].join(' ');
}
