import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Simulate database booking/validation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic validation
    if (!data.name || !data.email || !data.checkIn || !data.checkOut || !data.suite || !data.guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real application, we would save to a database here
    // e.g., await db.bookings.create({ data })

    return NextResponse.json({ success: true, message: 'Booking request received successfully' });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
