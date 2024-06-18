import { useParams, useNavigate } from "react-router-dom";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import { useState, useContext } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const result = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);

  const naviagte = useNavigate(); // to got to the home after clicking yes button

  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  {
    const pet = result.data.pets[0];
    return (
      <div className="details">
        <Carousel images={pet.images} />
        <div>
          <h1>{pet.name}</h1>
          <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Adopt {pet.name}
          </button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>{`Would you like to adopt ${pet.name}`}</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      naviagte("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
};

export default Details;
