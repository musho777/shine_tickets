export const truncateText = (text, count) => {
  if (text?.length > count) {
    return text.substring(0, count) + '...';
  }
  else {
    return text;
  }
}