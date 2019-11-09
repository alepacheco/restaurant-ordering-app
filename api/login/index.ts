import { NowRequest, NowResponse } from '@now/node';

const handler = (req: NowRequest, res: NowResponse) => {
  // TODO add validation
  const { username, password } = req.body;
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (username === 'admin' && password === 'admin') {
    return res.send({
      sessionId: 'userSessionId-5432',
    });
  }

  return res.status(403).send('Error');
};

export default handler;
