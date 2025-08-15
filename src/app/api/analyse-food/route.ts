import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    // Here you would add your logic to analyze the food data
    // For now, we'll just return a success message with the received data
    return NextResponse.json({ message: 'Food data received and analyzed (mock)', receivedData: data }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
