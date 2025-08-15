
/**
 * @author Narendra Khadayat
 */
//


import { kv } from '@vercel/kv';


export const config = {
  runtime: 'edge',
};


export default async function handler(request) {
  try {
    const newCount = await kv.incr('visitorCount');

    return new Response(
      JSON.stringify({ count: newCount }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
