import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema(
  {
    action: { type: String, enum: [`PUT`, `POST`], required: true },
  },
  { timestamps: true }
);

const StatsModel = mongoose.model(`Stats`, StatsSchema);
export { StatsModel };
