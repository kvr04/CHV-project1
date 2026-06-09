import { NextResponse } from 'next/server';

const PREDEFINED_RESPONSES: Record<string, string> = {
  availability: "We currently have limited availability in our Presidential Suite and Sky Palace Villa for the upcoming season. Would you like me to reserve a tentative hold for your dates?",
  dining: "Our fine dining options include: Michelin-star rooftop candlelight dinners, custom wine tasting in our private cave vaults, and personalized tableside cooking curated by our resident Chef. Bookings are recommended at least 24 hours in advance.",
  spa: "Luxoria Palace spa features private thermal baths carved in travertine columns, botanical aromatherapy sessions, and an infinity lagoon. Treatments are available daily from 08:00 to 22:00.",
  wellness: "Wellness options include sunlit yoga sessions, biomechanically optimized personal trainers, and private meditation gardens surrounded by soothing spring waters.",
  booking: "Reservations can be locked directly using our final reservation form at the bottom of the page, or I can manually prepare a custom itinerary for you. Please let me know your preferred dates.",
  amenities: "Our key amenities include 24/7 private butler services, airport pickup via premium zero-emission limousines, an art vault repository, private beach channels, and automated smart-room panel controls."
};

const BOT_FALLBACK = "I am only authorized to assist with room availability, services, bookings, dining arrangements, spa, and general wellness amenities inside Luxoria Palace. Please let me know how I can guide your stay.";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    const lowerText = message.toLowerCase();
    let botResponse = BOT_FALLBACK;

    if (lowerText.includes("room") || lowerText.includes("suite") || lowerText.includes("villa") || lowerText.includes("availability") || lowerText.includes("stay")) {
      botResponse = PREDEFINED_RESPONSES.availability;
    } else if (lowerText.includes("dining") || lowerText.includes("food") || lowerText.includes("restaurant") || lowerText.includes("wine") || lowerText.includes("chef") || lowerText.includes("eat")) {
      botResponse = PREDEFINED_RESPONSES.dining;
    } else if (lowerText.includes("spa") || lowerText.includes("massage") || lowerText.includes("thermal") || lowerText.includes("pool")) {
      botResponse = PREDEFINED_RESPONSES.spa;
    } else if (lowerText.includes("yoga") || lowerText.includes("wellness") || lowerText.includes("gym") || lowerText.includes("fitness")) {
      botResponse = PREDEFINED_RESPONSES.wellness;
    } else if (lowerText.includes("book") || lowerText.includes("reserve") || lowerText.includes("hold") || lowerText.includes("reservation")) {
      botResponse = PREDEFINED_RESPONSES.booking;
    } else if (lowerText.includes("amenity") || lowerText.includes("service") || lowerText.includes("butler") || lowerText.includes("beach")) {
      botResponse = PREDEFINED_RESPONSES.amenities;
    }

    // Simulate natural AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ reply: botResponse });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
