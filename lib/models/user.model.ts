import mongoose from "mongoose";
import crypto from "crypto";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "dark",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    messageNotifications: {
      type: Boolean,
      default: false,
    },
    unreadMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    privacySettings: {
      hideProfilePhoto: {
        type: Boolean,
        default: false,
      },
      hideOnlineStatus: {
        type: Boolean,
        default: false,
      },
      hideLastSeen: {
        type: Boolean,
        default: false,
      },
      noFindingMe: {
        type: Boolean,
        default: false,
      },
      hideOtherContacts: {
        type: Boolean,
        default: false,
      },
    },
    passwordToken: {
      type: String,
      default: "",
    },
    passwordTokenExpiration: {
      type: Date,
      default: Date.now,
    },
    resetToken: {
      type: String,
      default: "",
    },
    resetTokenExpiration: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordToken = passwordToken;
  this.passwordTokenExpiration = Date.now() + 3600000; // 1 hour
  this.resetToken = resetToken;
  this.resetTokenExpiration = Date.now() + 3600000; // 1 hour
  return { resetToken, passwordToken };
};

export default mongoose.models.User || mongoose.model("User", userSchema);
