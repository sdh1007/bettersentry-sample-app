/**
 * Checkout service.
 *
 * FIX: Added missing import for calculateTax.
 */

import { calculateTax } from "./payment";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function processCheckout(items: CartItem[]): Promise<{
  subtotal: number;
  tax: number;
  total: number;
}> {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = calculateTax(subtotal);

  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}
