import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import sgMail from '@sendgrid/mail'

export async function POST(req) {
  const body = await req.json()

  console.log('body', body)

  const supabase = createRouteHandlerClient()
  let { data: card, error } = await supabase
    .from('card')
    .select('*')
    .eq('id', body.cardId)

  console.log('cardfirst')
  console.log('card', card)

  const msg = {
    to: card.card_data.user_email, // Change to your recipient
    from: 'noreply@gifgrams.com', // Change to your verified sender
    subject: `${card.card_data.recipientName} reacted to your GifGram: ${body.emoji}`,
    text: `${profile.full_name} sent you a GifGram! ${body.card_data.title} Open your virtual greeting here: https://gifgrams.com/${body.id}`,
    html: `<p>${profile.full_name} sent you a GifGram! </p><strong>${body.card_data.title}</strong><p>Open your virtual greeting here: https://gifgrams.com/${body.id}</p>`,
  }
  console.log('msg', msg)

  const { response: sgResponse, error: sgError } = await sgMail.send(msg)
  console.log(sgResponse?.[0].statusCode)
  console.log(sgResponse?.[0].headers)
  console.error(sgError)

  return NextResponse.json(
    sgError ? { error: sgError } : { message: 'Success' },
    {
      status: sgError ? 500 : 200,
    }
  )
}
