import { Schema, model } from 'mongoose';
const companySchema = new Schema({
    image: { type: String },
    name: { type: String, required: true },
    owner: { type: String, required: true },
    details: {
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
      },
      contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        website: { type: String, required: true },
      },
      employees: [
        {
          name: { type: String, required: true },
          position: { type: String, required: true },
          email: { type: String, required: true, unique: true },
          phone: { type: String, required: true },
        },
      ],
      departments: [
        {
          name: { type: String, required: true },
          manager: { type: String, required: true },
          employees: [{ type: String, required: true }],
        },
      ],
      products: [
        {
          name: { type: String, required: true },
          category: { type: String, required: true },
          price: { type: Number, required: true },
          launch_date: { type: Date, required: true },
        },
      ],
      financials: {
        fiscal_year: { type: Number, required: true },
        revenue: { type: Number, required: true },
        expenses: { type: Number, required: true },
        net_income: { type: Number, required: true },
      },
    },
  });
  
  export default model('Company', companySchema);