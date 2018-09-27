import React, { Component } from "react";

class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };

  // This can be done once and then not have to
  // be worried about in the future
  // As props change we can keep re-doing it
  // This not change very frequently
  // This(filter) could be done in the render method
  // but it ends up being more complicated over time
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  handleIndexClick = ev => {
    this.setState({
      active: Number(ev.target.dataset.index)
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /*eslint-disable-next-line*/
            <img
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
