/**
 * Interface representing the response from Flickr Search Photos method API.
 */

export interface IPhoto {
  id: string;
  title: string;
}

/**
 * Interface representing the response from Flickr photos getInfo method API.
 */

export interface IPhotoInfo {
  id: string;
  title: string;
  ownerName: string;
  url: string;
}

/**
 * Interface representing the photo object returned by the getInfo method.
 */

export interface IFlickrPhoto {
  id: string;
  secret: string;
  server: string;
}
