"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface EventFiltersProps {
  events: any[];
}

const categories = [
  "All",
  "Technology",
  "Design",
  "Startups",
  "Conference",
  "Meetup",
  "Workshop",
];

export default function EventFilters({ events }: EventFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.tags?.some((tag: string) =>
          tag.toLowerCase().includes(query)
        ) ||
        event.location.city.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  return (
    <div>
      {/* SEARCH + FILTERS */}
      <div className="mb-12">
        <div className="relative mb-5">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="SEARCH EVENTS, CITIES, TOPICS..."
            className="w-full rounded-xl border border-[#2a171b] bg-[#101010] px-5 py-5 pr-12  text-xs font-bold tracking-[0.12em] text-white outline-none transition-colors placeholder:text-[#555] focus:border-[#ff1f3d]"
          />

          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#555]">
            /
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`border px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 ${
                  active
                    ? "border-[#ff1f3d] bg-[#ff1f3d] text-white"
                    : "border-[#2a171b] bg-[#101010] text-[#858585] hover:border-[#ff1f3d] hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="mb-6 flex items-center justify-between border-b border-[#2a171b] pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#858585]">
          {filteredEvents.length.toString().padStart(2, "0")}{" "}
          {filteredEvents.length === 1 ? "EVENT" : "EVENTS"} FOUND
        </p>

        {(search || category !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff1f3d] transition-colors hover:text-white"
          >
            CLEAR FILTERS
          </button>
        )}
      </div>

      {/* EVENT GRID */}
      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event._id}
              className="group overflow-hidden rounded-2xl border border-[#2a171b] bg-[#101010] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff1f3d]"
            >
              {/* IMAGE HEADER */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151515]">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="relative h-full w-full overflow-hidden bg-[#111]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,31,61,0.32),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(169,15,39,0.2),transparent_35%)]" />

                    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />

                    <div className="absolute bottom-5 left-5 text-5xl font-black uppercase tracking-[-0.08em] text-white/10">
                      EVENT
                    </div>
                  </div>
                )}

                {/* DARK IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

                {/* CATEGORY */}
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#080808]/80 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {event.category}
                </div>

                {/* PRICE */}
                <div className="absolute bottom-4 right-4 rounded-full bg-[#080808]/90 px-3 py-2 text-xs font-black text-white backdrop-blur-sm">
                  {event.price === 0
                    ? "FREE"
                    : `₹${event.price.toLocaleString("en-IN")}`}
                </div>
              </div>

              {/* CARD CONTENT */}
              <div className="p-5">
                {/* TITLE */}
                <h3 className="min-h-[3.5rem] text-2xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white">
                  {event.title}
                </h3>

                {/* EVENT META */}
                <div className="mt-5 space-y-2 border-t border-[#2a171b] pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#858585]">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#858585]">
                      {event.startTime}
                    </p>
                  </div>

                  <p className="truncate text-sm text-[#c5c5c5]">
                    {event.location.city} · {event.location.venue}
                  </p>
                </div>

                {/* EVENT FIT */}
                <div className="mt-6 border-y border-[#2a171b] py-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#858585]">
                        Event Fit
                      </p>

                      <p className="mt-1 text-4xl font-black tracking-[-0.06em] text-[#5ee6a8]">
                        {event.fit ? `${event.fit.score}%` : "—"}
                      </p>
                    </div>

                    {event.fit && (
                      <p className="pb-1 text-[9px] font-black uppercase tracking-[0.15em] text-[#858585]">
                        {event.fit.label}
                      </p>
                    )}
                  </div>

                  {/* FIT REASONS */}
                  {event.fit && (
                    <div className="mt-4 space-y-1.5">
                      {event.fit.reasons
                        .slice(0, 3)
                        .map((reason: string) => (
                          <p
                            key={reason}
                            className="text-xs text-[#5ee6a8]"
                          >
                            ✓ {reason}
                          </p>
                        ))}

                      {event.fit.warnings
                        .slice(0, 2)
                        .map((warning: string) => (
                          <p
                            key={warning}
                            className="text-xs text-[#ffc857]"
                          >
                            ⚠ {warning}
                          </p>
                        ))}
                    </div>
                  )}
                </div>

                {/* VIEW EVENT */}
                <Link
                  href={`/events/${event._id}`}
                  className="group/link mt-5 flex w-full items-center justify-between rounded-xl border border-[#ff1f3d] px-4 py-3.5  text-[10px] font-black uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-[#ff1f3d]"
                >
                  <span>View Event</span>

                  <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#2a171b] py-20 text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white">
            No events found
          </p>

          <p className="mt-3 text-xs text-[#858585]">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  );
}