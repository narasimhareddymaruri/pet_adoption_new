import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
const ANIMALS = ["bird", "cat", "dog", "rabbit"];
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import { useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const SearchParams = () => {
  // const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  let [adoptedPet, setAdoptedPet] = useContext(AdoptedPetContext);
  if (adoptedPet) {
    adoptedPet = adoptedPet.images[0].replace("http", "https");
    // console.log(adoptImage);
  }
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const BREEDS = useBreedList(animal);
  const [params, setParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const result = useQuery(["pets", params], fetchSearch);
  const pets = result?.data?.pets ?? [];
  // console.log(pets);

  // useEffect(() => {
  //   requestPets();
  // }, []);

  // async function requestPets() {
  //   const response = await fetch(
  //     `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  //   );
  //   const json = await response.json();
  //   setPets(json.pets);
  // }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target);
          const object = {
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          };
          setParams(object);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-conatiner">
            <img src={adoptedPet} />
          </div>
        ) : null}
        <label htmlFor="location">
          location
          <input
            // onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            name="location"
            // value={location}
          ></input>
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            value={animal}
            name="animal"
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal, key) => (
              <option key={key}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            id="breed"
            name="breed"
            // value={breed}
            // onChange={(e) => {
            //   setBreed(e.target.value);
            // }}
            disabled={BREEDS.length == 0}
          >
            <option />
            {BREEDS.map((breed, key) => (
              <option key={key}>{breed}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <div>
        <Results pets={pets} />
      </div>
    </div>
  );
};
export default SearchParams;
