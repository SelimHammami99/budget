interface TData {
  _id: string;
  name: string;
  description: string;
  type: string;
  amount: string;
  userId: string;
}

export const getTypes = (data: TData[]) => {
  const allTypes = data.map((row: TData) => row.type);
  const uniqueTypes = Array.from(new Set(allTypes));
  return uniqueTypes;
};
