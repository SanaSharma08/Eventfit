import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserByEmail } from "@/services/users";
import { getEvents } from "@/services/events";
import { calculateEventFit } from "@/services/event-fit";
import { getPreferenceByUserId } from "@/services/preferences";
import EventFilters from "@/components/events/EventFilters";
import { IEvent } from "@/models/Event";
import AnimatedStar from "@/components/ui/AnimatedStar";

export default async function Home() {
  const events = await getEvents();

  const session = await getServerSession(authOptions);

  const user = session?.user?.email
    ? await getUserByEmail(session.user.email)
    : null;

  const preference = user
    ? await getPreferenceByUserId(user._id)
    : null;

  const eventsWithFit = preference
    ? events.map((event: IEvent) => ({
        ...event,
        fit: calculateEventFit(event, preference),
      }))
    : events;

  return (
    <main className="bg-[#080808] text-[#f5f5f5]">
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden border-b border-[#2a171b]">
        <AnimatedStar
  className="
    right-[-90px]
    top-[8%]
    h-[260px]
    w-[260px]
    opacity-60
    sm:right-[-70px]
    sm:top-[6%]
    sm:h-[320px]
    sm:w-[320px]
    md:right-[-50px]
    md:top-[8%]
    md:h-[400px]
    md:w-[400px]
    lg:right-[6%]
    lg:top-[12%]
    lg:h-[420px]
    lg:w-[420px]
    lg:opacity-100
  "
/>
        {/* Background glow */}
        <div className="hero-glow pointer-events-none absolute inset-0" />

        {/* Grid */}
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-6xl">
            
            <h1 className="max-w-6xl text-[clamp(4rem,10vw,9.5rem)] font-black uppercase leading-[0.8] tracking-[-0.08em]">
              FIND EVENTS
              <br />
              YOU&apos;LL ACTUALLY
              <br />
              <span className="text-[#ff1f3d]">ATTEND.</span>
            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 border-t border-[#2a171b] pt-8 md:flex-row md:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-[#858585]">
                Don&apos;t just find an event. Find one you can actually make.
                EventFit matches events against your interests, schedule and
                everyday travel reality.
              </p>

              <a
                href="#discover"
                className="inline-flex w-fit items-center gap-5 border border-[#ff1f3d] px-6 py-4 rounded-4xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#ff1f3d]"
              >
                Explore Events
                <span className="text-base">↓</span>
              </a>
            </div>
          </div>

          {/* Editorial metadata */}
          <div className="mt-20 grid border-y border-[#2a171b] sm:grid-cols-3">
            {[
              ["01", "DISCOVER", "Find events worth knowing about."],
              ["02", "CHECK FIT", "See if they fit your actual life."],
              ["03", "SHOW UP", "Register and make it happen."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="border-b border-[#2a171b] py-6 sm:border-b-0 sm:border-r last:sm:border-r-0 sm:px-6 first:sm:pl-0"
              >
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#ff1f3d]">
                  {number}
                </p>

                <p className="mt-3 text-sm font-black uppercase tracking-[0.12em]">
                  {title}
                </p>

                <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#858585]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative overflow-hidden border-b border-[#2a171b]">
        <AnimatedStar
  className="
    -right-[150px]
    top-1/2
    h-[430px]
    w-[430px]
    -translate-y-1/2
    rotate-[18deg]
    opacity-20
    sm:-right-[130px]
    sm:h-[500px]
    sm:w-[500px]
    sm:opacity-25
    md:-right-[110px]
    md:h-[600px]
    md:w-[600px]
    md:opacity-30
    lg:-right-[120px]
    lg:h-[700px]
    lg:w-[700px]
    lg:opacity-40
  "
/>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff1f3d]">
                THE PROBLEM
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
                DISCOVERY
                <br />
                IS EASY.
                <br />
                <span className="text-[#858585]">DECIDING ISN&apos;T.</span>
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-8 text-[#858585] md:text-lg">
                You find an event you love. Then reality kicks in.
                <br />
                <br />
                Is it on a day you&apos;re free? Can you get there in time?
                Is it close enough? Does it actually match what you&apos;re
                looking for?
                <br />
                <br />
                EventFit makes those answers visible before you commit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="discover" className="border-b border-[#2a171b]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>

              <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
                EVENTS WORTH
                <br />
                SHOWING UP FOR.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#858585]">
              Search by city, topic or category. Then let Event Fit help you
              understand whether the event actually works for you.
            </p>
          </div>

          <EventFilters events={eventsWithFit} />
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative overflow-hidden border-b border-[#2a171b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,31,61,0.12),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-40">
          <p className="text-center text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
            INTERESTED
            <br />
            <span className="text-[#ff1f3d]">≠</span> AVAILABLE.
          </p>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-7 text-[#858585]">
            An event can be perfect on paper and completely wrong for your
            Tuesday night. Context matters.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-b border-[#2a171b]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mb-16">
            <h2 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
              LESS SCROLLING.
              <br />
              MORE SHOWING UP.
            </h2>
          </div>

          <div className="grid border-t border-[#2a171b] md:grid-cols-3">
            {[
              {
                number: "01",
                title: "SET YOUR WORLD",
                text: "Tell EventFit what you like, when you are available and how far you are willing to travel.",
              },
              {
                number: "02",
                title: "FIND YOUR FIT",
                text: "Every event is evaluated against your preferences to create a transparent Event Fit score.",
              },
              {
                number: "03",
                title: "MAKE IT HAPPEN",
                text: "See the reasons behind the score, choose what works and register in seconds.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="border-b border-[#2a171b] p-8 md:border-b-0 md:border-r last:md:border-r-0 md:min-h-[300px]"
              >
                <p className="text-5xl font-black tracking-[-0.06em] text-[#ff1f3d]">
                  {step.number}
                </p>

                <h3 className="mt-14 text-xl font-black uppercase tracking-[-0.02em]">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-[#858585]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-[#2a171b]">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-40">
          <div className="border border-[#2a171b] bg-[#101010] p-8 md:p-14 lg:p-20">
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <h2 className="mt-5 text-5xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-7xl">
                  FIND YOUR
                  <br />
                  NEXT THING.
                </h2>
              </div>

              <div>
                <p className="text-sm leading-7 text-[#858585]">
                  The right event isn&apos;t just interesting. It fits your
                  life well enough for you to actually be there.
                </p>

                <a
                  href="#discover"
                  className="mt-8 inline-flex items-center gap-5 bg-[#ff1f3d] px-6 py-4 text-[10px] font-black uppercase rounded-3xl tracking-[0.2em] transition-colors hover:bg-[#a90f27]"
                >
                  Explore Events
                  <span className="text-base">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-10 md:flex-row md:items-end lg:px-8">
          <div>
            <p className="text-2xl font-black tracking-[-0.08em] text-[#ff1f3d]">
              EVENT<span className="text-white">FIT</span>
            </p>

            <p className="mt-2 text-xs text-[#858585]">
              Events that fit your life.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#858585]">
              DON&apos;T JUST FIND AN EVENT.
            </p>

            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff1f3d]">
              FIND ONE YOU CAN ACTUALLY MAKE.
            </p>

            <p className="mt-6 text-[10px] tracking-[0.15em] text-[#555]">
              EVENTFIT / 2026
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}