import { getEvents } from "@/services/events";
import Link from "next/link";

import { calculateEventFit } from "@/services/event-fit";
import { getPreferenceByUserId } from "@/services/preferences";
import { getDemoUser } from "@/services/users";

function EventCard({ event }: { event: any }) {
  return (
    <article className="border border-neutral-800 bg-[#101010] p-5">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
            {event.category}
          </p>

          <h3 className="text-xl font-bold uppercase tracking-tight text-white">
            {event.title}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Entry
          </p>

          <p className="text-sm font-bold text-white">
            {event.price === 0
              ? "FREE"
              : `₹${event.price.toLocaleString("en-IN")}`}
          </p>
        </div>
      </div>

      <div className="mb-5 space-y-2 border-t border-neutral-800 pt-4 text-sm">
        <p className="text-neutral-300">
          {event.location.city} · {event.location.venue}
        </p>

        <p className="text-neutral-500">
          {event.startTime} — {event.endTime}
        </p>

        <p className="text-neutral-500">
          {new Date(event.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Event Fit
        </p>

        <p className="text-2xl font-black text-[#FF1F3D]">
          {event.fit ? `${event.fit.score}%` : "—"}
        </p>

        {event.fit && (
          <div className="mt-3 space-y-1">
            {event.fit.reasons.map((reason) => (
              <p
                key={reason}
                className="text-xs text-[#5EE6A8]"
              >
                ✓ {reason}
              </p>
            ))}

            {event.fit.warnings.map((warning) => (
              <p
                key={warning}
                className="text-xs text-[#FFC857]"
              >
                ⚠ {warning}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function Home() {
  const events = await getEvents();
  const user = await getDemoUser();

  const preference = user
    ? await getPreferenceByUserId(user._id)
    : null;

  const eventsWithFit = preference
    ? events.map((event) => ({
        ...event,
        fit: calculateEventFit(event, preference),
      }))
    : events;
  return (
    <main className="min-h-screen overflow-hidden bg-[#080808]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-x border-[#2a171b] px-5 py-5 lg:px-8">
        <a
          href="/"
          className="text-xl font-black tracking-[-0.08em] text-[#ff1f3d]"
        >
          EVENT<span className="text-[#f5f5f5]">FIT</span>
        </a>

        <div className="hidden items-center gap-8 text-[11px] font-bold tracking-[0.15em] text-[#858585] md:flex">
          <a href="#discover" className="transition-colors hover:text-white">
            DISCOVER
          </a>

          <a href="#how-it-works" className="transition-colors hover:text-white">
            HOW IT WORKS
          </a>

          <a href="#about" className="transition-colors hover:text-white">
            ABOUT
          </a>
        </div>

        <button className="bg-[#ff1f3d] px-4 py-2 text-[10px] font-black tracking-[0.15em] text-white transition-colors hover:bg-[#a90f27]">
          GET STARTED
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl border-x border-[#2a171b] px-5 lg:px-8">
        <div className="border-b border-[#2a171b] py-6 text-[9px] font-bold tracking-[0.3em] text-[#858585]">
          EVENT DISCOVERY / 01
        </div>

        <div className="relative py-20 md:py-28 lg:py-32">
          <div className="absolute right-0 top-12 hidden text-[9px] tracking-[0.3em] text-[#ff1f3d] lg:block">
            28.6139° N / 77.2090° E
          </div>

          <p className="mb-5 text-xs font-bold tracking-[0.3em] text-[#ff1f3d]">
            DISCOVER DIFFERENTLY
          </p>

          <h1 className="max-w-5xl text-[17vw] font-black uppercase leading-[0.76] tracking-[-0.08em] text-[#f5f5f5] sm:text-[13vw] md:text-[11vw] lg:text-[9rem]">
            FIND
            <br />
            EVENTS
            <br />
            <span className="text-[#ff1f3d]">YOU&apos;LL</span>
            <br />
            ACTUALLY
            <br />
            ATTEND.
          </h1>

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-6 text-[#858585]">
              EventFit helps you discover events based on more than just
              location and popularity. See whether an event actually fits
              your interests, schedule and everyday life.
            </p>

            <a
              href="#discover"
              className="inline-flex w-fit items-center gap-4 border border-[#ff1f3d] px-6 py-4 text-xs font-black tracking-[0.15em] transition-colors hover:bg-[#ff1f3d]"
            >
              EXPLORE EVENTS
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden border-y border-[#2a171b] py-4">
          <div className="whitespace-nowrap text-xs font-black tracking-[0.2em] text-[#ff1f3d]">
            EVENTS THAT FIT YOUR LIFE&nbsp;&nbsp; • &nbsp;&nbsp;
            DISCOVER&nbsp;&nbsp; • &nbsp;&nbsp;COMPARE&nbsp;&nbsp; • &nbsp;&nbsp;
            DECIDE&nbsp;&nbsp; • &nbsp;&nbsp; EVENTS THAT FIT YOUR LIFE&nbsp;&nbsp;
            • &nbsp;&nbsp; DISCOVER&nbsp;&nbsp; • &nbsp;&nbsp;COMPARE
          </div>
        </div>

        {/* Event Discovery */}
        <section id="discover" className="py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#ff1f3d]">
                02 / DISCOVER
              </p>

              <h2 className="text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
                EVENTS
                <br />
                THAT FIT.
              </h2>
            </div>

            <p className="max-w-xs text-xs leading-5 text-[#858585]">
              Your event feed shouldn't just show what's happening. It should
              help you decide what's worth making time for.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventsWithFit.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </section>

        {/* Product explanation */}
        <section
          id="how-it-works"
          className="border-t border-[#2a171b] py-20 md:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-[10px] font-bold tracking-[0.3em] text-[#ff1f3d]">
                03 / THE IDEA
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
                AN EVENT
                <br />
                IS ONLY
                <br />
                USEFUL IF
                <br />
                YOU CAN
                <br />
                MAKE IT.
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <p className="max-w-lg text-lg leading-8 text-[#858585]">
                Most event platforms help you answer one question:
                <span className="text-white"> &quot;What&apos;s happening?&quot;</span>
              </p>

              <p className="mt-6 max-w-lg text-lg leading-8 text-[#858585]">
                EventFit adds another:
                <span className="text-[#ff1f3d]">
                  {" "}
                  &quot;Can I realistically make it?&quot;
                </span>
              </p>

              <div className="mt-10 grid grid-cols-3 border-y border-[#2a171b] py-5">
                <div>
                  <p className="text-2xl font-black">01</p>
                  <p className="mt-1 text-[9px] tracking-[0.15em] text-[#858585]">
                    DISCOVER
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-black">02</p>
                  <p className="mt-1 text-[9px] tracking-[0.15em] text-[#858585]">
                    COMPARE
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-black">03</p>
                  <p className="mt-1 text-[9px] tracking-[0.15em] text-[#858585]">
                    DECIDE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="about"
          className="border-t border-[#2a171b] py-8"
        >
          <div className="flex flex-col gap-4 text-[9px] font-bold tracking-[0.2em] text-[#858585] md:flex-row md:items-center md:justify-between">
            <span>EVENTFIT / 2026</span>
            <span>BUILT FOR PEOPLE WHO HAVE PLACES TO BE.</span>
          </div>
        </footer>
      </section>
    </main>
  );
}