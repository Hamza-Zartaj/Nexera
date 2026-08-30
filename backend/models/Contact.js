import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  service: String,
  message: { type: String, required: true },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
