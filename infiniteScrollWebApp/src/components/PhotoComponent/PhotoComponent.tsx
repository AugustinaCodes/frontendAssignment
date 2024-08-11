import { useEffect, useState } from "react";
import { IPhotoInfo } from "../../types/photoInterfaces";
import styles from "./PhotoComponent.module.scss";

interface PhotoComponentProps {
  photo: IPhotoInfo;
}

const PhotoComponent = ({ photo }: PhotoComponentProps) => {

  const [isFavourite, setIsFavourite] = useState(false);

  const LOCAL_STORAGE_KEY = `favourite_${photo.id}`;

  useEffect(() => {
    const storedFavourite = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFavourite) {
      setIsFavourite(JSON.parse(storedFavourite))
    }
  }, [LOCAL_STORAGE_KEY]);

  const handleFavouriteToggle = () => {
    const newFavouriteStatus = !isFavourite;
    setIsFavourite(newFavouriteStatus);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavouriteStatus))
  }

  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        src={`${photo.url}?w=400`} 
        srcSet={`${photo.url}?w=800 800w, ${photo.url}?w=1200 1200w`}
        sizes="(min-width: 1200px) 1200px, (min-width: 800px) 800px, 100vw" 
        alt={photo.title}
        loading="lazy"
      />
      <div className={styles.hoverContent}>
        <h1>{photo.title}</h1>
        <hr />
        <h3>{photo.ownerName}</h3>
        <button className={isFavourite ? styles.favourited : ''} onClick={handleFavouriteToggle}>{isFavourite ? "Favourited" : "Favourite"}</button>
      </div>
    </div>
  );
};

export default PhotoComponent;
