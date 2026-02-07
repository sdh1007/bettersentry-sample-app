/**
 * Checkout service.
 *
 * BUG 2 (handleCheckout): Calls `processPayment()` without importing it.
 * The function exists in ./payment.ts but the import statement is missing,
 * causing:
 *   ReferenceError: processPayment is not defined
 *
 * FIX: Add `import { processPayment } from "./payment";` at the top.
 */

interface CheckoutRequest {
  items: { id: string; price: number; quantity: number }[];
  currency?: string;
}

interface CheckoutResult {
  orderId: string;
  total: number;
  paymentStatus: string;
  transactionId: string;
}

export async function handleCheckout(
  request: CheckoutRequest
): Promise<CheckoutResult> {
  // Calculate total
  const total = request.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const currency = request.currency ?? "usd";

  // BUG: processPayment is not imported — ReferenceError at runtime
  // @ts-expect-error processPayment is intentionally not imported (planted bug)
  const payment = await processPayment(total, currency);

  return {
    orderId: `ord_${Date.now()}`,
    total,
    paymentStatus: payment.success ? "completed" : "failed",
    transactionId: payment.transactionId,
  };
}
