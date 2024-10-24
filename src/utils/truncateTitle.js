export default function truncateTitle(str) {
  if (str.length > 30) {
    const text = str.slice(0, 20);
    const a = text.split(" ");
    a.splice(a.length - 1, 1);
    const res = a.join(" ");
    return `${res}...`;
  }
  return str;
}
