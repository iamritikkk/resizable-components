import mongoose from "mongoose";

const ResizableSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const ResizableModel = mongoose.model(`Resizable`, ResizableSchema);
export { ResizableModel };
