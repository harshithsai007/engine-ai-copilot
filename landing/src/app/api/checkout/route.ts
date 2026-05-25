import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST() {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    if (baseUrl && !baseUrl.startsWith('http')) {
      baseUrl = `https://${baseUrl}`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'EngineAI Elite Annual',
              description: 'Elite technical interview guidance - Founder\'s Choice.',
            },
            unit_amount: 50000, // $500.00
            recurring: {
              interval: 'year',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
