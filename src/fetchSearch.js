const fetchSearch = async ({ queryKey }) => {
  const { location, animal, breed } = queryKey[1];

  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );

  if (!apiRes.ok) {
    throw new Error(`${animal} and ${location} and ${breed} is wrong`);
  }

  return apiRes.json();
};

export default fetchSearch;
