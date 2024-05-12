import mongoose from "mongoose";

const ResizableSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    componentId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ResizableModel = mongoose.model(`Resizable`, ResizableSchema);
export { ResizableModel };
