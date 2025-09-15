// remitaPayment.js
const REMITA_TEST_URL =
  "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";

const validatePaymentData = (data) => {
  const requiredFields = ["key", "email", "amount", "rrr"];

  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // Ensure amount is a number and properly formatted
  const amount = parseFloat(data.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount value");
  }
};

const loadRemitaScript = () => {
  return new Promise((resolve, reject) => {
    if (window.RmPaymentEngine) {
      resolve(window.RmPaymentEngine);
      return;
    }

    const script = document.createElement("script");
    script.src = REMITA_TEST_URL;
    script.async = true;

    script.onload = () => {
      if (window.RmPaymentEngine) {
        resolve(window.RmPaymentEngine);
      } else {
        reject(
          new Error("Remita script loaded but RmPaymentEngine not initialized")
        );
      }
    };

    script.onerror = () => {
      reject(new Error("Failed to load Remita script"));
    };

    document.body.appendChild(script);
  });
};

export const initializeRmPaymentEngine = async (data) => {
  try {
    // Validate payment data
    validatePaymentData(data);

    const RmPaymentEngine = await loadRemitaScript();

    console.log("Initializing Remita with configuration:", {
      ...data,
      key: "[MASKED]",
      apiKey: data.apiKey ? "[MASKED]" : undefined,
      merchantId: "[MASKED]",
    });

    const paymentEngine = RmPaymentEngine.init({
      ...data,
      environment: "TEST",
    });

    if (!paymentEngine) {
      throw new Error("Payment engine initialization failed");
    }

    paymentEngine.showPaymentWidget();
    return paymentEngine;
  } catch (error) {
    console.error("Remita payment initialization error:", error);
    throw error;
  }
};
