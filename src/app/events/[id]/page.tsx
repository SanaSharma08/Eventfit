import { notFound } from "next/navigation";
import { getEventById } from "@/services/events";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const { id } = await params;

  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">

        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#FF1F3D]">
          {event.category}
        </p>

        <h1 className="max-w-4xl text-5xl font-black uppercase tracking-tight md:text-7xl">
          {event.title}
        </h1>

        <div className="mt-10 grid gap-8 border-y border-neutral-800 py-8 md:grid-cols-2">

          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Date & Time
            </p>

            <p className="mt-2 text-lg">
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p className="text-neutral-400">
              {event.startTime} — {event.endTime}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Location
            </p>

            <p className="mt-2 text-lg">
              {event.location.venue}
            </p>

            <p className="text-neutral-400">
              {event.location.city}, {event.location.state}
            </p>
          </div>

        </div>

        <div className="mt-12 max-w-3xl">
          <p className="text-lg leading-8 text-neutral-300">
            {event.description}
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-neutral-800 pt-8">

          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Entry
            </p>

            <p className="text-3xl font-bold">
              {event.price === 0
                ? "FREE"
                : `₹${event.price.toLocaleString("en-IN")}`}
            </p>
          </div>

          <button className="bg-[#FF1F3D] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
            Register →
          </button>

        </div>

      </div>
    </main>
  );
}