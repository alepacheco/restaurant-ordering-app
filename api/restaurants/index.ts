import { NowRequest, NowResponse } from '@now/node';

const getRandomRestaurant = () => ({
  id: `${Math.random()}`,
  title: `McDonalds`,
  image_url: 'https://picsum.photos/84/84',
  description: 'This is the restaurant description',
});

const handler = (req: NowRequest, res: NowResponse) => {
  const restaurants = new Array(50)
    .fill(getRandomRestaurant)
    .map(element => element());

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(restaurants);
};

export default handler;
