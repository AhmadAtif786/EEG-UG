import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  organisation: string;
  registerNr: string;
  uid: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  email: string;
  accountHolder: string;
  bankName: string;
  iban: string;
  bic: string;
  supplyPoint: { value: string }[];
  feedPoint: { value: string }[];
  installationAddress: string;
  installationZip: string;
  installationCity: string;
  installationPower: string;
  consentEEG: boolean;
  consentContract: boolean;
  fileName?: string;
}

const MemberSchema = new Schema<IMember>(
  {
    organisation: { type: String },
    registerNr: { type: String },
    uid: { type: String },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    birthDate: { type: String },
    phone: { type: String },
    address: { type: String },
    zip: { type: String },
    city: { type: String },
    email: { type: String, required: true },
    accountHolder: { type: String },
    bankName: { type: String },
    iban: { type: String },
    bic: { type: String },
    supplyPoint: [{ value: String }],
    feedPoint: [{ value: String }],
    installationAddress: { type: String },
    installationZip: { type: String },
    installationCity: { type: String },
    installationPower: { type: String },
    consentEEG: { type: Boolean, default: false },
    consentContract: { type: Boolean, default: false },
    fileName: { type: String },
  },
  { timestamps: true, strict: true }
);

// 🚀 Force fresh model in dev (fixes schema caching issue)
if (mongoose.models.Member) {
  delete mongoose.models.Member;
}

const Member = mongoose.model<IMember>("Member", MemberSchema);
export default Member;
