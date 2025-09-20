import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userAuthSchema = new Schema({
  // sparse: true allows the field to be optional and unique (only if present)
  email: { type: String, sparse: true, unique: true },
  phone: { type: Number, sparse: true, unique: true },
  password: { type: String, default: "123456" },
  verified: { type: Boolean, default: false },
});

const userInfoSchema = new Schema({
  userId: ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  profession: { type: String, required: true },
});

const UserAuthModel = mongoose.model("userAuth", userAuthSchema);
const UserInfoModel = mongoose.model("userInfo", userInfoSchema);

// ES6 exports
export { UserAuthModel, UserInfoModel };
