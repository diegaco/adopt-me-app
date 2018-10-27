import React, { Component } from "react";
import { PetMedia, PetPhoto } from "petfinder-client";

interface Props {
  media: PetMedia;
}

interface State {
  active: number;
  photos: PetPhoto[];
}

class Carousel extends Component<Props, State> {
  public state = {
    photos: [] as PetPhoto[],
    active: 0
  };

  // This can be done once and then not have to
  // be worried about in the future
  // As props change we can keep re-doing it
  // This not change very frequently
  // This(filter) could be done in the render method
  // but it ends up being more complicated over time
  public static getDerivedStateFromProps({ media }: Props) {
    let photos: PetPhoto[] = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  public handleIndexClick = (ev: React.MouseEvent<HTMLElement>) => {
    if (!(ev.target instanceof HTMLElement)) {
      return;
    }
    if (ev.target.dataset.index) {
      this.setState({
        active: Number(ev.target.dataset.index)
      });
    }
  };

  public render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo: PetPhoto, index) => (
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
