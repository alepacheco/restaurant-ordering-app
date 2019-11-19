export interface ItemOptions {
  _id: string;
  name: string;
  type: 'single' | 'multi';
  choices: Array<{
    _id: string;
    description: string;
    price: string;
  }>;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  options: Array<ItemOptions>;
}

export interface MenuSection {
  _id: string;
  title: string;
  items: Array<MenuItem>;
}

export interface Location {
  coordinates: Array<number>;
  type: 'Point';
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  bannerImgUrl: string;
  menu: Array<MenuSection>;
  location: Location;
}

export interface NearbyRestaurant {
  _id?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  rating?: number;
  distance?: string;
}

export interface RestaurantMapMarker {
  _id: string;
  latitude: number;
  longitude: number;
  emoji: string;
}
