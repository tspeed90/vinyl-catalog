export interface CatalogData {
  collectionTitles: {
    [key:string]: Collection;
  };
  albums: Album
}


export interface Album {
  artist: string;
  album: string;
  played: boolean;
  copies: Copy[];
  collections: string[];
}

export interface Copy {
  catalogueNo: string;
  location: string;
  needNewJacket: boolean;
  needInnerSleeve: boolean;
  condition: {
    sleeve: Condition;
    media: Condition;
  };
  purchasedByMe: boolean;
  purchaseDate: string;
}

export interface Condition {
  rating: string;
  notes: string;
}

export interface Collection {
  displayName: string;
  belongsTo: string;
}
