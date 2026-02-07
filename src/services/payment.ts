/**
 * Payment processing utilities.
 */

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  amount: number;
}

export async function processPayment(
  amount: number,
  currency: string
): Promise<PaymentResult> {
  // Simulated payment processing
  if (amount <= 0) {
    throw new Error("Payment amount must be positive");
  }

  return {
    success: true,
    transactionId: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    amount,
  };
}
