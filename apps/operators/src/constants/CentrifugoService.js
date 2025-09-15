import axios from "axios";
import { Centrifuge } from "centrifuge";
import config from "../config";

const getConnectionToken = async () => {
  const response = await axios.get(
    `${config.BASE_URL}/modules/websockets/token/`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  // console.log("Token from backend:", response?.data?.data);
  return response?.data?.data?.token;
};

let centrifuge = null;

const init = async () => {
  // Use WebSocket URL for connection
  centrifuge = new Centrifuge(config.CENTRIFUGO_URL, {
    getToken: getConnectionToken,
    debug: true,
  });

  // centrifuge.on("connected", (context) => {
  //   console.log("Connected to Centrifugo:", context);
  // });

  // centrifuge.on("connecting", (context) => {
  //   console.log("Connecting to Centrifugo:", context);
  // });

  // centrifuge.on("error", (context) => {
  //   console.error("Centrifugo connection error:", context);
  // });

  centrifuge.connect();
};

const getSubscriptionToken = async (channel) => {
  try {
    // Use BASE_URL for HTTP API calls
    const response = await axios.post(
      `${config.BASE_URL}/modules/websockets/channels/token/`,
      { channel: channel },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("Subscription token:", response.data.data);
    return response.data.data.token;
  } catch (error) {
    // console.error("Subscription token error:", error.response?.data || error);
    throw error;
  }
};

const getPersonalChannelSubscriptionToken = async (channel) => {
  return getSubscriptionToken(channel);
};

const subscribe = (channel) => {
  const existingSubscription = centrifuge?.getSubscription(channel);
  if (existingSubscription) return existingSubscription;

  const sub = centrifuge?.newSubscription(channel, {
    getToken: () => getPersonalChannelSubscriptionToken(channel),
  });

  sub?.on("error", function (ctx) {
    console.error("Subscription error:", ctx);
    if (ctx.error) {
      console.error("Error details:", {
        code: ctx.error.code,
        message: ctx.error.message,
      });
    }
  });

  sub?.subscribe();
  return sub;
};

const disconnect = () => {
  if (centrifuge) {
    console.log("Disconnecting Centrifuge");
    centrifuge.disconnect();
    centrifuge = null;
  }
};

export const centrifugoService = {
  init,
  subscribe,
  disconnect,
};
