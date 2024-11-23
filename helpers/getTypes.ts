interface DataRow {
  type: string;
  id: string;
  name: string;
  amount: string;
}

export const getTypes = (data: DataRow[]) => {
  const allTypes = data.map((row: DataRow) => row.type);
  const uniqueTypes = Array.from(new Set(allTypes));
  return uniqueTypes;
};
