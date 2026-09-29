import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "../src/models/Event";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const events = [
  {
    title: "AI & The Future of Work",
    description:
      "A one-day conference exploring AI, automation and the changing future of work.",
    category: "Technology",
    tags: ["AI", "Artificial Intelligence", "Startups", "Future of Work"],
    date: new Date("2026-10-18"),
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    location: {
      venue: "India Habitat Centre",
      address: "Lodhi Road",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      coordinates: {
        lat: 28.5921,
        lng: 77.2273,
      },
    },
    price: 999,
    currency: "INR",
    capacity: 500,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Design Systems Meetup",
    description:
      "Designers and frontend engineers come together to discuss scalable design systems, accessibility and product consistency.",
    category: "Design",
    tags: ["Design", "UX", "Product", "Frontend"],
    date: new Date("2026-10-21"),
    startTime: "06:30 PM",
    endTime: "09:00 PM",
    location: {
      venue: "91Springboard Gurugram",
      address: "Golf Course Road",
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      coordinates: {
        lat: 28.4595,
        lng: 77.0266,
      },
    },
    price: 499,
    currency: "INR",
    capacity: 150,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Founders After Dark",
    description:
      "An informal evening for startup founders, builders and entrepreneurs to exchange ideas and meet fellow creators.",
    category: "Startups",
    tags: ["Startups", "Entrepreneurship", "Founders", "Networking"],
    date: new Date("2026-10-24"),
    startTime: "07:00 PM",
    endTime: "10:00 PM",
    location: {
      venue: "WeWork Noida",
      address: "Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: {
        lat: 28.6271,
        lng: 77.3714,
      },
    },
    price: 799,
    currency: "INR",
    capacity: 200,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "React India Community Night",
    description:
      "A community evening for React developers featuring practical talks, project showcases and open discussions.",
    category: "Technology",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    date: new Date("2026-10-28"),
    startTime: "06:30 PM",
    endTime: "09:00 PM",
    location: {
      venue: "WeWork Galaxy",
      address: "Residency Road",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      coordinates: {
        lat: 12.9716,
        lng: 77.5946,
      },
    },
    price: 399,
    currency: "INR",
    capacity: 180,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Product People Mumbai",
    description:
      "A meetup for product managers, designers and engineers exploring how great digital products are built.",
    category: "Product",
    tags: ["Product", "Product Management", "UX", "Technology"],
    date: new Date("2026-11-01"),
    startTime: "05:30 PM",
    endTime: "08:00 PM",
    location: {
      venue: "T-Hub Mumbai",
      address: "Lower Parel",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      coordinates: {
        lat: 19.0144,
        lng: 72.8277,
      },
    },
    price: 0,
    currency: "INR",
    capacity: 250,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Indie Hackers Pune",
    description:
      "Independent builders share how they turn side projects into products, businesses and sustainable startups.",
    category: "Startups",
    tags: ["Startups", "Indie Hackers", "Entrepreneurship", "SaaS"],
    date: new Date("2026-11-05"),
    startTime: "06:00 PM",
    endTime: "09:00 PM",
    location: {
      venue: "COEP Innovation Centre",
      address: "Shivajinagar",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      coordinates: {
        lat: 18.5284,
        lng: 73.8567,
      },
    },
    price: 299,
    currency: "INR",
    capacity: 120,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "UX Research Lab",
    description:
      "A hands-on session covering user interviews, usability testing, research synthesis and product discovery.",
    category: "Design",
    tags: ["UX", "UX Research", "Design", "Product"],
    date: new Date("2026-11-08"),
    startTime: "11:00 AM",
    endTime: "03:00 PM",
    location: {
      venue: "91Springboard Koramangala",
      address: "Koramangala",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      coordinates: {
        lat: 12.9352,
        lng: 77.6245,
      },
    },
    price: 599,
    currency: "INR",
    capacity: 80,
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Build with AI Workshop",
    description:
      "A practical workshop where developers build useful AI-powered applications using modern APIs and workflows.",
    category: "Technology",
    tags: ["AI", "Generative AI", "Python", "APIs", "Development"],
    date: new Date("2026-11-12"),
    startTime: "10:00 AM",
    endTime: "04:00 PM",
    location: {
      venue: "T-Hub Hyderabad",
      address: "Raidurg",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      coordinates: {
        lat: 17.4474,
        lng: 78.3762,
      },
    },
    price: 799,
    currency: "INR",
    capacity: 100,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Creative Code Chennai",
    description:
      "Explore the intersection of technology, interaction and visual creativity through experimental code.",
    category: "Technology",
    tags: ["Creative Coding", "JavaScript", "Design", "Technology"],
    date: new Date("2026-11-15"),
    startTime: "02:00 PM",
    endTime: "06:00 PM",
    location: {
      venue: "IIT Madras Research Park",
      address: "Kanagam Road",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: {
        lat: 12.9916,
        lng: 80.2336,
      },
    },
    price: 499,
    currency: "INR",
    capacity: 140,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Startup Stories Jaipur",
    description:
      "Founders from Rajasthan share the highs, failures and unexpected lessons behind building startups.",
    category: "Startups",
    tags: ["Startups", "Founders", "Entrepreneurship", "Business"],
    date: new Date("2026-11-19"),
    startTime: "05:00 PM",
    endTime: "08:00 PM",
    location: {
      venue: "Startup Oasis",
      address: "JLN Marg",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      coordinates: {
        lat: 26.8467,
        lng: 75.8056,
      },
    },
    price: 0,
    currency: "INR",
    capacity: 200,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Women in Product Delhi",
    description:
      "A community gathering connecting women across product, design, engineering and startup leadership.",
    category: "Product",
    tags: ["Product", "Women in Tech", "Leadership", "UX"],
    date: new Date("2026-11-22"),
    startTime: "04:00 PM",
    endTime: "07:00 PM",
    location: {
      venue: "91Springboard Delhi",
      address: "Okhla Phase III",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      coordinates: {
        lat: 28.5355,
        lng: 77.2732,
      },
    },
    price: 349,
    currency: "INR",
    capacity: 160,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  },

  {
    title: "Future of Design Summit",
    description:
      "A full-day exploration of emerging design practices, AI-assisted creativity and the future of digital experiences.",
    category: "Design",
    tags: ["Design", "AI", "UX", "Future", "Creative Technology"],
    date: new Date("2026-11-28"),
    startTime: "09:30 AM",
    endTime: "06:00 PM",
    location: {
      venue: "Jio World Convention Centre",
      address: "Bandra Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      coordinates: {
        lat: 19.0676,
        lng: 72.8692,
      },
    },
    price: 1499,
    currency: "INR",
    capacity: 600,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
];

async function seedEvents() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI!);

    console.log("Connected.");

    await Event.deleteMany({});

    console.log("Existing events cleared.");

    const createdEvents = await Event.insertMany(events);

    console.log(
      `Successfully created ${createdEvents.length} events.`
    );

    createdEvents.forEach((event) => {
      console.log(`✓ ${event.title}`);
    });
  } catch (error) {
    console.error("Failed to seed events:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

seedEvents();