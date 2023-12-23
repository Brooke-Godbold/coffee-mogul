import paths from "@/paths";
import { useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function usePaymentResult() {
  const stripe = useStripe();
  const router = useRouter();

  useEffect(() => {
    async function getPaymentSession() {
      if (!stripe) {
        return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) return;

      const paymentIntent = await stripe.retrievePaymentIntent(clientSecret);

      switch (paymentIntent.paymentIntent?.status) {
        case "succeeded":
          toast("Success! Payment received.");
          break;

        case "processing":
          toast(
            `Payment processing. We'll update you when payment is received.`
          );
          break;

        case "requires_payment_method":
          toast(`Payment failed. Please try another payment method.`);
          // Redirect your user back to your payment page to attempt collecting payment again
          break;

        default:
          toast("Something went wrong.");
          break;
      }

      router.push(paths.ordersPath());
    }

    getPaymentSession();
  }, [stripe, router]);
}
