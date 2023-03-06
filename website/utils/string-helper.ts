const snipLength = 250;

export const snipDescription = (description: string) => {
  if (!description) return "";

  if (description.length < snipLength) {
    return description;
  }
  return `${description.slice(0, snipLength).trimEnd()}...`;
};
