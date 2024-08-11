import { useEffect, useState } from "react";
import { getPhotos, getPhotoInfo } from "../../services/flickrService";
import styles from "./GalleryPage.module.scss";
import { IPhotoInfo } from "../../types/photoInterfaces";
import PhotoComponent from "../../components/PhotoComponent/PhotoComponent";

const GalleryPage = () => {
  const [photos, setPhotos] = useState<IPhotoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 


  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const galleryPhotos = await getPhotos(page);
        const detailedPhotoInfo = await Promise.all(
          galleryPhotos.map(async (photo) => {
            const photoInfo = await getPhotoInfo(photo.id);
            return photoInfo;
          })
        );
        setPhotos((prevPhotos) => [...prevPhotos, ...detailedPhotoInfo]);
        setLoading(false);

        if (galleryPhotos.length < 20) {
          setHasMore(false)
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
        setPage((prevPage) => prevPage + 1)
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasMore])

  if (loading && page === 1) {
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
