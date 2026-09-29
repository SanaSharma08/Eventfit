"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  location: {
    venue: string;
    city: string;
  };
}

interface Registration {
  _id: string;
  eventId: Event;
  registeredAt: string;
}

export default function MyEventsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const response = await fetch("/api/registrations");
        const data = await response.json();

        if (data.success) {
          setRegistrations(data.registrations || []);
        }
      } catch (error) {
        console.error("Failed to load registrations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRegistrations();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080808] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          Loading your events...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#ff1f3d]">
            EVENTFIT / MY EVENTS
          </p>

          <h1 className="text-5xl font-black uppercase tracking-[-0.06em] md:text-7xl">
            EVENTS
            <br />
            YOU&apos;RE MAKING.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-[#858585]">
            Events you&apos;ve decided are worth making time for.
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="border border-[#2a171b] bg-[#101010] p-10">
            <p className="text-lg font-bold uppercase">
              No registered events yet.
            </p>

            <p className="mt-2 text-sm text-[#858585]">
              Find something that fits your life and register for it.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex bg-[#ff1f3d] px-6 py-3 text-xs font-black uppercase tracking-[0.15em] transition hover:bg-[#a90f27]"
            >
              Discover Events →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {registrations.map((registration) => {
              const event = registration.eventId;

              return (
                <article
                  key={registration._id}
                  className="border border-[#2a171b] bg-[#101010] p-5"
                >
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff1f3d]">
                    {event.category}
                  </p>

                  <h2 className="text-xl font-black uppercase">
                    {event.title}
                  </h2>

                  <div className="mt-6 space-y-2 border-t border-[#2a171b] pt-4 text-sm">
                    <p className="text-[#f5f5f5]">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-[#858585]">
                      {event.startTime} — {event.endTime}
                    </p>

                    <p className="text-[#858585]">
                      {event.location.venue} · {event.location.city}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 block border border-[#ff1f3d] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.15em] transition hover:bg-[#ff1f3d]"
                  >
                    View Event
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}