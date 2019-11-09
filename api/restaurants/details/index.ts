import { NowRequest, NowResponse } from '@now/node';

const handler = (req: NowRequest, res: NowResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.send({
    bannerImage: 'https://picsum.photos/84/84',
    description: 'This is the description',
    name: 'McDonals',
  });
};

export default handler;
