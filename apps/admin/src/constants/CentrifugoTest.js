import React, { useEffect, useState, useRef } from "react";
import { centrifugoService } from "./CentrifugoService";
import BaseDashboardNavigation from "../generalComponents/BaseDashboardNavigation";
import useGetUserDetailsManager from "../modules/settings/controllers/get_UserDetails_controller";

const CentrifugoTest = () => {
  const [connectionStatus, setConnectionStatus] = useState("Not Connected");
  const [subscriptionStatus, setSubscriptionStatus] =
    useState("Not Subscribed");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const subscriptionRef = useRef(null);

  const { data } = useGetUserDetailsManager();

  const userId = data?.data?.user?.id;

  const channel = `personal:${userId}`;

  useEffect(() => {
    let isMounted = true;

    const initializeCentrifugo = async () => {
      try {
        if (isMounted) setConnectionStatus("Connecting...");

        // Initialize Centrifugo connection
        await centrifugoService.init();

        if (isMounted) {
          setConnectionStatus("Connected");

          // Only create subscription if it doesn't exist
          if (!subscriptionRef.current) {
            subscriptionRef.current = centrifugoService.subscribe(channel);
            setSubscriptionStatus("Subscribed");

            // Listen for messages
            subscriptionRef.current.on("publication", (ctx) => {
              if (isMounted) {
                setReceivedMessages((prev) => [...prev, ctx.data]);
              }
            });

            // Listen for subscription errors
            subscriptionRef.current.on("error", (ctx) => {
              console.error("Subscription error:", ctx);
              if (isMounted) {
                setSubscriptionStatus("Subscription Error");
              }
            });
          }
        }
      } catch (error) {
        console.error("Error in CentrifugoTest:", error);
        if (isMounted) {
          setConnectionStatus("Connection Error");
          setSubscriptionStatus("Subscription Error");
        }
      }
    };

    initializeCentrifugo();

    // Cleanup function
    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        try {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        } catch (error) {
          console.error("Error unsubscribing:", error);
        }
      }
    };
  }, [channel]); // Empty dependency array means this effect runs once on mount

  return (
    <BaseDashboardNavigation>
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Centrifugo Test Panel</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Connection Status</h3>
            <p
              className={`${
                connectionStatus === "Connected"
                  ? "text-green-600"
                  : connectionStatus === "Connecting..."
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {connectionStatus}
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Subscription Status</h3>
            <p
              className={`${
                subscriptionStatus === "Subscribed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {subscriptionStatus}
            </p>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Received Messages</h3>
            {receivedMessages.length === 0 ? (
              <p className="text-gray-500">No messages received yet</p>
            ) : (
              <div className="space-y-2">
                {receivedMessages.map((msg, index) => (
                  <div key={index} className="p-2 bg-white rounded border">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(msg, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default CentrifugoTest;
