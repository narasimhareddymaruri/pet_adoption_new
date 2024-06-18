import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;

    const hero = images[active].replace("http", "https");
    return (
      <div className="carousel">
        <img src={hero} />
        <div className="carousel-smaller">
          {images.map((photo, index) => {
            photo = photo.replace("http", "https");
            return (
              <img
                src={photo}
                key={photo}
                className={index === active ? "active" : ""}
                data-index={index}
                onClick={this.handleClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
