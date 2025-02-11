import { Schema, model } from 'mongoose';

const toppingSchema = new Schema({
  name: { type: String, required: true },
});

const Topping = model('Topping', toppingSchema);
export default Topping;
