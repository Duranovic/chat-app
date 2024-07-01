export const compareTimestamps = (a?: string, b?: string) => {
  const aTimestamp = a ? new Date(a) : new Date(0);
  const bTimestamp = b ? new Date(b) : new Date(0);

  if (aTimestamp > bTimestamp) {
    return -1; // a should come before b
  } else if (aTimestamp < bTimestamp) {
    return 1; // b should come before a
  } else {
    return 0; // a and b have the same timestamp (or no messages)
  }
};
