import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    tag: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteSchema);
export default noteModel;
