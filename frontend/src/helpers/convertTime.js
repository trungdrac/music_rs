export const msToISO = (time) => {
  const timeISO = new Date(time * 1000).toISOString().substr(14, 5);
  return timeISO;
};
