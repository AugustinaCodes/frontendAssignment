// Represents the response from Flickr Search Photos method API.
export interface IPhoto {
  id: string;
  title: string;
}

// Represents the response from Flickr photos getInfo method API.
export interface IPhotoInfo {
  id: string;
  title: string;
  ownerName: string;
  url: string;
}

// Represents the photo object returned by the getInfo method.
export interface IFlickrPhoto {
  id: string;
  secret: string;
  server: string;
}

// Represents the response structure from Flickr's photo search API
export interface IFlickrPhotoSearchResponse {
  stat: string;
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: IPhoto[];
  };
}

// Represents the structure of the photo information response from Flickr
export interface IFlickrPhotoInfoResponse {
  stat: string;
  photo: {
    id: string;
    title: {
      _content: string;
    };
    owner: {
      realname: string;
    };
    server: string;
    secret: string;
  };
}
