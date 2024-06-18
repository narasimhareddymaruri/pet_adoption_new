import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length == 0 ? (
        <h1>no pets found</h1>
      ) : (
        <>
          {pets.map((pet, key) => (
            <Pet
              id={pet.id}
              name={pet.name}
              animal={pet.animal}
              city={pet.city}
              state={pet.state}
              breed={pet.breed}
              images={pet.images}
              key={pet.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Results;
