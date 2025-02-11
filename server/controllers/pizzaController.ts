import { Request, Response } from 'express';
import Pizza from '../models/pizza';
import Topping from '../models/topping';

// Create a new pizza
export const createPizza = async (req: Request, res: Response) => {
  const { name, description, toppings } = req.body;
  try {
    const pizza = new Pizza({
      name,
      description,
      toppings,
    });
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    res.status(500).json({ error: 'Error creating pizza' });
  }
};

// Get all pizzas with toppings
export const getAllPizzas = async (req: Request, res: Response) => {
  try {
    const pizzas = await Pizza.find().populate('toppings');
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pizzas' });
  }
};

// Update pizza with toppings
export const updatePizza = async (req: Request, res: Response) => {
  const pizzaId = req.params.id;
  const { name, description, toppings } = req.body;
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      pizzaId,
      { name, description, toppings },
      { new: true }
    );
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({ error: 'Error updating pizza' });
  }
};

// Delete pizza by ID
export const deletePizza = async (req: Request, res: Response) => {
  const pizzaId = req.params.id;
  try {
    const pizza = await Pizza.findByIdAndDelete(pizzaId);
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    res.status(200).json({ message: 'Pizza deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting pizza' });
  }
};

// Remove a topping from a pizza
export const removeToppingFromPizza = async (req: Request, res: Response) => {
  const pizzaId = req.params.pizzaId;
  const toppingId = req.params.toppingId; // The ID of the topping to remove
  try {
    // Find the pizza by ID and remove the topping from the toppings array
    const pizza = await Pizza.findByIdAndUpdate(
      pizzaId,
      { $pull: { toppings: { _id: toppingId } } }, // MongoDB $pull operator removes the topping by ID
      { new: true }
    );
    if (!pizza) {
      return res.status(404).json({ error: 'Pizza not found' });
    }
    res.status(200).json({ message: 'Topping removed from pizza', pizza });
  } catch (error) {
    res.status(500).json({ error: 'Error removing topping from pizza' });
  }
};
