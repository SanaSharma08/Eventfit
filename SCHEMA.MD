# User 
User {
  _id
  name
  email
  avatar?
  createdAt
  updatedAt
}

# Preferences 
Preferences {
  _id
  userId

  interests: string[]

  preferredEventTypes: string[]

  availableDays: string[]

  preferredStartTime: string
  preferredEndTime: string

  maxTravelMinutes: number

  homeLocation: {
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }

  createdAt
  updatedAt
}

# Event 
Event {
  _id

  title
  description

  category
  tags[]

  organizerId

  date
  startTime
  endTime

  location: {
    venue
    address
    city
    state
    country

    coordinates: {
      lat
      lng
    }
  }

  price
  currency

  capacity

  image

  createdAt
  updatedAt
}

# Registration 
Registration {
  _id

  userId
  eventId

  status

  registeredAt
}

# Result 
{
  score: 92,

  label: "Great Fit",

  breakdown: {
    interests: 31,
    schedule: 30,
    travel: 18,
    eventType: 13
  },

  reasons: [
    "Matches 3 of your interests",
    "Fits your preferred time",
    "Within your travel range"
  ],

  warnings: []
}