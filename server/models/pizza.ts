import { Schema, model } from 'mongoose';

const toppingSchema = new Schema({
  name: { type: String, required: true }
});

const pizzaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  toppings: [toppingSchema], 
});

const Pizza = model('Pizza', pizzaSchema);
export default Pizza;
