const API_KEY = import.meta.env.VITE_FLICKR_API_KEY;
const PHOTOS_API_URL = import.meta.env.VITE_FLICKR_PHOTOS_API_URL;
import { IPhoto, IPhotoInfo, IFlickrPhoto } from "../types/photoInterfaces";

/**
 * Fetches a list of photos from the Flickr gallery.
 *
 * @returns {Promise<IPhoto[]>} A promise that resolves to an array of photos.
 * @throws {Error} If the API request fails or returns an error status.
 */

export const getPhotos = async (): Promise<IPhoto[]> => {
  const response = await fetch(PHOTOS_API_URL);
  const data = await response.json();

  if (data.stat === "ok") {
    return data.photos.photo.map((photo: IPhoto) => ({
      id: photo.id,
      title: photo.title,
    }));
  } else {
    throw new Error("Failed to fetch gallery photos");
  }
};

/**
 * Fetches detailed information for a specific photo from Flickr.
 *
 * @param {string} photoId - The ID of the photo to fetch information for.
 * @returns {Promise<IPhotoInfo>} A promise that resolves to the photo's detailed information.
 * @throws {Error} If the API request fails or returns an error status.
 */

export const getPhotoInfo = async (photoId: string): Promise<IPhotoInfo> => {
  const response = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
  );
  const data = await response.json();

  if (data.stat === "ok") {
    const photo = data.photo;
    return {
      id: photo.id,
      title: photo.title._content,
      ownerName: photo.owner.realname,
      url: constructPhotoUrl(photo),
    };
  } else {
    throw new Error(`Failed to fetch photo info for photo ID ${photoId}`);
  }
};

/**
 * Constructs a URL for a photo given its details.
 *
 * @param {IFlickrPhoto} photo - The photo details object.
 * @returns {string} The URL of the photo.
 */

const constructPhotoUrl = (photo: IFlickrPhoto): string => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
};
