export function setAddress({ blockNumber, Street, Barangay, City, Province }) {
  return `${blockNumber} ${Street} ${Barangay} ${City} ${Province}`;
}
