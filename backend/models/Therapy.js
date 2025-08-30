import mongoose from "mongoose";

const therapySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Therapy name is required"], 
      unique: true, 
      trim: true 
    },
    code: { 
      type: String, 
      required: [true, "Therapy code is required"], 
      unique: true, 
      uppercase: true, 
      trim: true 
    },
    duration: { 
      type: Number, 
      required: [true, "Duration is required"], 
      min: [1, "Duration must be at least 1 minute"] 
    },
    price: { 
      type: Number, 
      default: 0, 
      min: [0, "Price cannot be negative"] 
    },
    description: { 
      type: String, 
      trim: true 
    },

    // References to users
    patient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      
    },
    practitioner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Practitioner is required"] 
    }
  },
  { 
    timestamps: true,
    versionKey: false // "__v" ko remove karne ke liye
  }
);

// Indexing (fast lookup ke liye)
therapySchema.index({ name: 1 });
therapySchema.index({ code: 1 });

export default mongoose.model("Therapy", therapySchema);
