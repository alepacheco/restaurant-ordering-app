export interface UserOrder {
  restaurantName: string;
  restaurantImageUrl: string;
  items: Array<{
    amount: number;
    name: string;
  }>;
  total: string;
}
