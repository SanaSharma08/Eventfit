import { IEvent } from "@/models/Event";

interface UserPreference {
  interests: string[];
  preferredEventTypes: string[];
  availableDays: string[];
  preferredStartTime: string;
  preferredEndTime: string;
  maxTravelMinutes: number;

  homeLocation: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

interface FitResult {
  score: number;
  label: string;

  breakdown: {
    interests: number;
    schedule: number;
    travel: number;
    eventType: number;
  };

  reasons: string[];
  warnings: string[];
}

function calculateInterestScore(
  event: IEvent,
  preferences: UserPreference
) {
  if (preferences.interests.length === 0) {
    return 35;
  }

  const eventTags = event.tags.map((tag) =>
    tag.toLowerCase()
  );

  const matches = preferences.interests.filter((interest) =>
    eventTags.includes(interest.toLowerCase())
  );

  return Math.round(
    (matches.length / preferences.interests.length) * 35
  );
}

function calculateEventTypeScore(
  event: IEvent,
  preferences: UserPreference
) {
  if (preferences.preferredEventTypes.length === 0) {
    return 15;
  }

  const matches = preferences.preferredEventTypes.some(
    (type) =>
      type.toLowerCase() === event.category.toLowerCase()
  );

  return matches ? 15 : 0;
}

function convertTimeToMinutes(time: string) {
  const [rawTime, modifier] = time.split(" ");

  let [hours, minutes] = rawTime.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

function calculateScheduleScore(
  event: IEvent,
  preferences: UserPreference
) {
  const eventDate = new Date(event.date);

  const day = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const dayMatches =
    preferences.availableDays.length === 0 ||
    preferences.availableDays.includes(day);

  const eventStart = convertTimeToMinutes(event.startTime);
  const eventEnd = convertTimeToMinutes(event.endTime);

  const preferredStart = convertTimeToMinutes(
    preferences.preferredStartTime
  );

  const preferredEnd = convertTimeToMinutes(
    preferences.preferredEndTime
  );

  const timeFullyFits =
    eventStart >= preferredStart &&
    eventEnd <= preferredEnd;

  const timePartiallyFits =
    eventStart < preferredEnd &&
    eventEnd > preferredStart;

  if (dayMatches && timeFullyFits) {
    return 30;
  }

  if (dayMatches && timePartiallyFits) {
    return 15;
  }

  return 0;
}

function calculateDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const earthRadiusKm = 6371;

  const latDifference = ((lat2 - lat1) * Math.PI) / 180;
  const lngDifference = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(lngDifference / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function estimateTravelMinutes(distanceKm: number) {
  const averageSpeedKmPerHour = 30;

  return Math.round(
    (distanceKm / averageSpeedKmPerHour) * 60
  );
}

function calculateTravelScore(
  event: IEvent,
  preferences: UserPreference
) {
  const distanceKm = calculateDistanceKm(
    preferences.homeLocation.coordinates.lat,
    preferences.homeLocation.coordinates.lng,
    event.location.coordinates.lat,
    event.location.coordinates.lng
  );

  const estimatedMinutes =
    estimateTravelMinutes(distanceKm);

  if (
    estimatedMinutes <= preferences.maxTravelMinutes
  ) {
    return 20;
  }

  if (
    estimatedMinutes <=
    preferences.maxTravelMinutes + 30
  ) {
    return 10;
  }

  return 0;
}

export function calculateEventFit(
  event: IEvent,
  preferences: UserPreference
): FitResult {
  const interests = calculateInterestScore(
    event,
    preferences
  );

  const schedule = calculateScheduleScore(
    event,
    preferences
  );

  const travel = calculateTravelScore(
    event,
    preferences
  );

  const eventType = calculateEventTypeScore(
    event,
    preferences
  );

  const score =
    interests +
    schedule +
    travel +
    eventType;

  const reasons: string[] = [];
  const warnings: string[] = [];

  if (interests >= 25) {
    reasons.push("Matches your interests");
  }

  if (schedule === 30) {
    reasons.push("Fits your preferred time");
  }

  if (travel === 20) {
    reasons.push("Within your preferred travel range");
  }

  if (eventType === 15) {
    reasons.push("Matches your preferred event type");
  }

  if (schedule === 0) {
  warnings.push("Outside your preferred schedule");
} else if (schedule === 15) {
  warnings.push("Partially overlaps your preferred hours");
}

  if (travel < 20) {
    warnings.push("Outside your preferred travel range");
  }

  let label = "Low Fit";

  if (score >= 80) {
    label = "Great Fit";
  } else if (score >= 60) {
    label = "Good Fit";
  } else if (score >= 40) {
    label = "Possible Fit";
  }

  return {
    score,
    label,
    breakdown: {
      interests,
      schedule,
      travel,
      eventType,
    },
    reasons,
    warnings,
  };
}