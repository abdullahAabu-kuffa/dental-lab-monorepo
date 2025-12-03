"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => {
        render: (selector: string) => Promise<void>;
        catch: (callback: (err: unknown) => void) => unknown;
      };
    };
  }
}

export interface PayPalOrderDetails {
  id: string;
  status: string;
  [key: string]: unknown;
}

interface PayPalActions {
  order: {
    create: (data: { purchase_units: Array<{ amount: { value: string; currency_code: string } }> }) => unknown;
    capture: () => Promise<PayPalOrderDetails>;
  };
}

interface PayPalButtonProps {
  clientId: string;
  amount: string;
  currency?: string;
  invoiceId?: number;
  onSuccess?: (details: PayPalOrderDetails, invoiceId?: number) => void;
  onError?: (error: string) => void;
}

export default function PayPalButton({
  clientId,
  amount,
  currency = "EGP",
  invoiceId,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  // PayPal does not support EGP for order creation; using USD as default
  const effectiveCurrency = currency === "EGP" ? "USD" : currency;

  useEffect(() => {
    const checkPayPalLoaded = () => {
      if (window.paypal) {
        setSdkReady(true);
        return true;
      }
      return false;
    };

    if (checkPayPalLoaded()) return;

    const interval = setInterval(() => {
      if (checkPayPalLoaded()) clearInterval(interval);
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!window.paypal) setError("Failed to load PayPal SDK");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (sdkReady && window.paypal && buttonContainerRef.current && !renderedRef.current) {
      renderedRef.current = true;
      buttonContainerRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
          createOrder: (data: unknown, actions: unknown) => {
            return (actions as PayPalActions).order.create({
              purchase_units: [{ amount: { value: amount, currency_code: effectiveCurrency } }],
            });
          },
          onApprove: (data: unknown, actions: unknown) => {
            return (actions as PayPalActions).order.capture().then((details) => {
              onSuccess?.(details, invoiceId);
            });
          },
          onError: (err: unknown) => {
            const errorMessage = String(err);
            onError?.(errorMessage);
            setError(errorMessage);
          },
        })
        .render("#paypal-button-container")
        .catch((err: unknown) => {
          setError("Failed to render PayPal buttons");
          console.error("PayPal render error:", err);
        });
    }
  }, [sdkReady, amount, currency, invoiceId, onSuccess, onError]);

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&enable-funding=card`}
        strategy="lazyOnload"
      />

      <div className="paypal-wrapper">
        <div id="paypal-button-container" ref={buttonContainerRef} className="paypal-button-container">
          {!sdkReady && !error && <div className="loading">Loading PayPal...</div>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>

      <style jsx>{`
        .paypal-wrapper { padding: 20px; }
        .paypal-button-container { width: 100%; max-width: 400px; text-align: center; }
        .loading { text-align: center; font-family: Arial, sans-serif; color: #555; }
        .error { color: red; text-align: center; font-family: Arial, sans-serif; }
      `}</style>
    </>
  );
}