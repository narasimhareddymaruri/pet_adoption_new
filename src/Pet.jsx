import { Link } from "react-router-dom";
const Pet = ({ id, name, animal, city, state, breed, images }) => {
  let doggy = "https://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    doggy = images[0].replace("http", "https");
  }
  return (
    <Link className="pet" to={`/details/${id}`}>
      <div className="image-container">
        <img src={doggy} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal}--${breed}--${city},${state}`}</h2>
      </div>
    </Link>
  );
};
export default Pet;
