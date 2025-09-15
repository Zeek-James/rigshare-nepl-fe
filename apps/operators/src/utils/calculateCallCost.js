import { updateFirebaseDocument } from "@/constants/firebase/firebaseDocUpload";
import { useSelector } from "react-redux";

let userToken = 100; // Assuming the user starts with 100 tokens
const mainParticipantCharge = 1 / 60; //diving by 60 to get cost per second
const addedParticipantCharge = 0.4 / 60; //diving by 60 to get cost per second
let addedParticipantsCount = 3; // Number of participants added initially
const addedParticipantsChargeTotal =
  addedParticipantsCount * addedParticipantCharge;
const totalCharge = mainParticipantCharge + addedParticipantsChargeTotal;
let timeLeft = userToken / totalCharge;
let totalSpent = 0;
let totalTimeSpent = 0;
let intervalId;
// Function to calculate charges and update user's token balance

const calculateAndDeductCharges = ({ status, docId }) => {
  if (status === "ended") {
    endCall();
    return;
  }

  // Recalculate total charge based on current added participants count
  const mainParticipantChargeTotal = mainParticipantCharge;
  const addedParticipantsChargeTotal =
    addedParticipantsCount * addedParticipantCharge;
  const totalCost = mainParticipantChargeTotal + addedParticipantsChargeTotal;
  const totalCharge = totalCost * 5;

  if (userToken >= totalCharge) {
    userToken -= totalCharge;
    totalSpent += totalCharge;
    totalTimeSpent += 5; // Assuming each deduction takes 5 seconds
    timeLeft -= 5;

    // Check if time is up
    if (timeLeft < 5) {
      endCall();
    } else {
      // Print out the updated values
      console.log("User Token:", userToken);
      console.log("Total Spent:", totalSpent);
      console.log("Time Left:", timeLeft);
      console.log("Total Time Spent:", totalTimeSpent);
      console.log("Added Participants Count:", addedParticipantsCount);
      const detailsForFirebase = {
        status: status,
        price: totalSpent,
        duration: totalTimeSpent,
      };
      updateFirebaseDocument(docId, detailsForFirebase, "meetings");
    }
  } else {
    endCall(); // Not enough tokens, end the call
  }
};

// Function to end the call
const endCall = () => {
  console.log("Call ended");
  // Perform necessary actions to end the call
  clearInterval(intervalId);
};

// Function to start the interval for updating calculations every 5 seconds
export const startInterval = ({ status, docId }) => {
  intervalId = setInterval(() => {
    // Recalculate charges and deduct them
    calculateAndDeductCharges({ status: status, docId: docId });
  }, 5000); // 5000 milliseconds = 5 seconds
};
