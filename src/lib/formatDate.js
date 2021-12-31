export const formatDate = yourDate => {
  //date: YYYY-MM-DDTHH:mm:ss:sssZ
  return yourDate.toISOString().split("T")[0]
}
