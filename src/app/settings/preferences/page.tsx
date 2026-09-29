"use client";

import { useEffect, useState } from "react";

const INTERESTS = [
  "AI",
  "Startups",
  "Design",
  "Music",
  "Sports",
  "Networking",
  "Technology",
];

const EVENT_TYPES = [
  "Technology",
  "Design",
  "Startups",
  "Conference",
  "Meetup",
  "Workshop",
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function PreferencesPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("22:00");
  const [maxTravelMinutes, setMaxTravelMinutes] = useState(60);

  const [city, setCity] = useState("New Delhi");
  const [state, setState] = useState("Delhi");
  const [country, setCountry] = useState("India");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPreferences() {
      try {
        const response = await fetch("/api/preferences");
        const data = await response.json();

        if (!data.success || !data.preference) {
          return;
        }

        const preference = data.preference;

        setInterests(preference.interests || []);
        setEventTypes(preference.preferredEventTypes || []);
        setAvailableDays(preference.availableDays || []);

        setStartTime(preference.preferredStartTime || "09:00");
        setEndTime(preference.preferredEndTime || "22:00");
        setMaxTravelMinutes(preference.maxTravelMinutes || 60);

        setCity(preference.homeLocation?.city || "New Delhi");
        setState(preference.homeLocation?.state || "Delhi");
        setCountry(preference.homeLocation?.country || "India");
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, []);

  function toggleValue(
    value: string,
    currentValues: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((item) => item !== value));
    } else {
      setter([...currentValues, value]);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interests,
          preferredEventTypes: eventTypes,
          availableDays,
          preferredStartTime: startTime,
          preferredEndTime: endTime,
          maxTravelMinutes: Number(maxTravelMinutes),
          homeLocation: {
            city,
            state,
            country,
            coordinates: {
              lat: 28.6139,
              lng: 77.209,
            },
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage("Could not save preferences.");
        return;
      }

      setMessage("Preferences saved successfully.");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      setMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-16 text-[var(--foreground)]">
        <div className="mx-auto max-w-4xl">
          Loading preferences...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-16 text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
            EventFit / Preferences
          </p>

          <h1 className="text-5xl font-black uppercase tracking-tight">
            Tell us what fits your life.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Your preferences help EventFit calculate whether an event
            actually works for you — not just whether you might like it.
          </p>
        </div>

        <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 text-lg font-bold uppercase">
            What are you into?
          </h2>

          <p className="mb-6 text-sm text-[var(--muted)]">
            Select the topics you would genuinely attend events about.
          </p>

          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((interest) => {
              const selected = interests.includes(interest);

              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() =>
                    toggleValue(interest, interests, setInterests)
                  }
                  className={`border px-4 py-2 text-sm transition ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-white"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 text-lg font-bold uppercase">
            What kind of events?
          </h2>

          <p className="mb-6 text-sm text-[var(--muted)]">
            These preferences influence the Event Type part of your Fit score.
          </p>

          <div className="flex flex-wrap gap-3">
            {EVENT_TYPES.map((type) => {
              const selected = eventTypes.includes(type);

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    toggleValue(type, eventTypes, setEventTypes)
                  }
                  className={`border px-4 py-2 text-sm transition ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-white"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 text-lg font-bold uppercase">
            When can you go?
          </h2>

          <p className="mb-6 text-sm text-[var(--muted)]">
            EventFit checks these hours against every event.
          </p>

          <div className="mb-6 flex flex-wrap gap-3">
            {DAYS.map((day) => {
              const selected = availableDays.includes(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    toggleValue(day, availableDays, setAvailableDays)
                  }
                  className={`border px-4 py-2 text-sm transition ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-white"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block text-[var(--muted)]">
                Available from
              </span>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-[var(--border)] bg-black px-4 py-3 text-white outline-none focus:border-[var(--primary)]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-2 block text-[var(--muted)]">
                Available until
              </span>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-[var(--border)] bg-black px-4 py-3 text-white outline-none focus:border-[var(--primary)]"
              />
            </label>
          </div>
        </section>

        <section className="mt-6 border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 text-lg font-bold uppercase">
            How far will you travel?
          </h2>

          <p className="mb-6 text-sm text-[var(--muted)]">
            EventFit currently estimates travel using location coordinates.
          </p>

          <div className="flex items-center gap-6">
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={maxTravelMinutes}
              onChange={(e) =>
                setMaxTravelMinutes(Number(e.target.value))
              }
              className="w-full accent-[var(--primary)]"
            />

            <span className="w-24 text-right text-lg font-bold">
              {maxTravelMinutes} min
            </span>
          </div>
        </section>

        <section className="mt-6 border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="mb-2 text-lg font-bold uppercase">
            Where are you based?
          </h2>

          <p className="mb-6 text-sm text-[var(--muted)]">
            This will be used for future distance and commute calculations.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block text-[var(--muted)]">City</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-[var(--border)] bg-black px-4 py-3 text-white outline-none focus:border-[var(--primary)]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-2 block text-[var(--muted)]">State</span>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-[var(--border)] bg-black px-4 py-3 text-white outline-none focus:border-[var(--primary)]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-2 block text-[var(--muted)]">Country</span>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-[var(--border)] bg-black px-4 py-3 text-white outline-none focus:border-[var(--primary)]"
              />
            </label>
          </div>
        </section>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-[var(--success)]">{message}</p>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[var(--primary-dark)] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>
    </main>
  );
}