import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPreference extends Document {
  userId: mongoose.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const PreferenceSchema = new Schema<IPreference>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    preferredEventTypes: {
      type: [String],
      default: [],
    },

    availableDays: {
      type: [String],
      default: [],
    },

    preferredStartTime: {
      type: String,
      default: "09:00",
    },

    preferredEndTime: {
      type: String,
      default: "22:00",
    },

    maxTravelMinutes: {
      type: Number,
      default: 60,
    },

    homeLocation: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, default: "India" },

      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Preference: Model<IPreference> =
  mongoose.models.Preference ||
  mongoose.model<IPreference>("Preference", PreferenceSchema);

export default Preference;