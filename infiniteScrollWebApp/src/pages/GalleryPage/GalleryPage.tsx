import { useEffect, useState } from "react";
import { getPhotos, getPhotoInfo } from "../../services/flickrService";
import styles from "./GalleryPage.module.scss";
import { IPhotoInfo } from "../../types/photoInterfaces";
import PhotoComponent from "../../components/PhotoComponent/PhotoComponent";

/**
 * GalleryPage that fetches and displays a gallery of photos.
 * 
 * This page fetches a list of photos from the Flickr API, retrieves additional
 * information for each photo, and displays them in a gallery format. It handles
 * loading states and errors that might occur during the fetch operations.
 */

const GalleryPage = () => {
  const [photos, setPhotos] = useState<IPhotoInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const galleryPhotos = await getPhotos();
        const detailedPhotoInfo = await Promise.all(
          galleryPhotos.map(async (photo) => {
            const photoInfo = await getPhotoInfo(photo.id);
            return photoInfo;
          })
        );
        setPhotos(detailedPhotoInfo);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.gallery}>
      {photos.map((photo) => (
        <PhotoComponent key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default GalleryPage;
