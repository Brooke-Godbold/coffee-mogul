import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./payment-form.module.css";
import { usePaymentResult } from "@/hooks/usePaymentResult";
import { useSearchParams } from "next/navigation";
import { ContactOption } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import SpinnerMini from "@/ui/spinner/spinner-mini";
import paths from "@/paths";
import ErrorToast from "@/ui/error-toast/error-toast";

interface PaymentFormProps {
  savedAddresses: Array<ContactOption>;
}

interface PaymentState {
  isLoading: boolean;
  error: string | undefined;
}

export default function PaymentForm({ savedAddresses }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentState, setPaymentState] = useState<PaymentState>({
    isLoading: false,
    error: undefined,
  });

  const searchParams = useSearchParams();

  usePaymentResult();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!elements) return;

    setPaymentState({ isLoading: true, error: undefined });
  };

  useEffect(() => {
    async function payment() {
      if (paymentState.isLoading && elements) {
        // @ts-ignore
        const { error } = await stripe?.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000${paths.checkoutPath()}`,
          },
        });

        setPaymentState({ isLoading: false, error: error.message });
      }
    }

    payment();
  }, [elements, stripe, paymentState.isLoading]);

  // @ts-ignore
  const addresses = savedAddresses.map(({ addressId, ...address }) => address);

  return (
    <>
      <ErrorToast errors={paymentState.error ? [paymentState.error] : []} />
      {!searchParams.get("payment_intent_client_secret") ? (
        <form className={styles.paymentForm} onSubmit={handleSubmit}>
          <div className={styles.paymentSection}>
            <label>Address</label>
            <AddressElement
              options={{ mode: "shipping", contacts: addresses }}
            />
          </div>
          <div className={styles.paymentSection}>
            <label>Payment</label>
            <PaymentElement />
          </div>
          <button
            className={styles.submitButton}
            disabled={!stripe || !elements || paymentState.isLoading}
            style={{ position: "relative", height: "5rem" }}
          >
            {paymentState.isLoading ? <SpinnerMini /> : "Secure Checkout"}
          </button>
        </form>
      ) : null}
    </>
  );
}
