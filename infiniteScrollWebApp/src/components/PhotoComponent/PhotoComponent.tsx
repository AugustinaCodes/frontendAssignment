import { IPhotoInfo } from "../../types/photoInterfaces";
import styles from './PhotoComponent.module.scss'

interface PhotoComponentProps {
  photo: IPhotoInfo;
}

const PhotoComponent = ({ photo }: PhotoComponentProps) => {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={photo.url} alt={photo.title} />
      <div className={styles.hoverContent}>
        <h1>{photo.title}</h1>
        <hr />
        <h3>{photo.ownerName}</h3>
        <button>Favourite</button>
      </div>
    </div>
  );
};

export default PhotoComponent;
