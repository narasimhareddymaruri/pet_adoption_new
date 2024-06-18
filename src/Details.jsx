import { useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import { useState } from "react";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  const result = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);

  if (result.isLoading) {
    return (
      <>
        <h1>loading</h1>
      </>
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
                  <button>Yes</button>
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
