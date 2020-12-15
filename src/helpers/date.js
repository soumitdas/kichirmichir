const monthShortNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dateToMonDDYYYY = (dateString, separator = " ") => {
  const date = new Date(dateString);
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  return monthShortNames[m] + separator + d + separator + y;
};

export const dateToMonDDYYYYHHMM = (dateString, separator = " ") => {
  const date = new Date(dateString);
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();

  return (
    monthShortNames[m] +
    separator +
    d +
    "," +
    separator +
    y +
    separator +
    h +
    ":" +
    min
  );
};

export const dateToMonDDYYYYHHMMAP = (dateString, separator = " ") => {
  const date = new Date(dateString);
  const d = date.getDate();
  const y = date.getFullYear();
  const m = date.getMonth();
  let h = date.getHours();
  let min = date.getMinutes();

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  min = min < 10 ? "0" + min : min;

  return (
    monthShortNames[m] +
    separator +
    d +
    "," +
    separator +
    y +
    separator +
    h +
    ":" +
    min +
    " " +
    ampm
  );
};

export const dateToRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = (now.getTime() - date) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 60 * 60) {
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast < 24 * 60 * 60) {
    return parseInt(secondsPast / (60 * 60)) + "h";
  }
  if (secondsPast <= 30 * 24 * 60 * 60) {
    return parseInt(secondsPast / (24 * 60 * 60)) + "d";
  }
  if (secondsPast > 30 * 24 * 60 * 60) {
    return dateToMonDDYYYY(dateString);
  }
};
