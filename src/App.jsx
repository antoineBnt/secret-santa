import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ParticipantInput } from "./components/ParticipantInput";
import { AssignmentDisplay } from "./components/AssignmentDisplay";
import { SwipeButton } from "./components/SwipeButton";

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("welcome");

  const addParticipant = (name) => {
    setParticipants([...participants, name]);
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const distributeGifts = () => {
    if (participants.length < 2) {
      alert("Il faut au moins 2 participants pour faire un Secret Santa !");
      return;
    }

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const newAssignments = shuffled.map((giver, index) => ({
      giver,
      receiver: shuffled[(index + 1) % shuffled.length],
    }));

    setAssignments(newAssignments);
    setCurrentScreen("assignments");
  };

  const resetApp = () => {
    setParticipants([]);
    setAssignments([]);
    setCurrentScreen("welcome");
  };
  // coucou
  return (
    <div className="container mx-auto w-screen h-screen bg-[#101010]">
      <div>
        {currentScreen === "welcome" && (
          <WelcomeScreen onStart={() => setCurrentScreen("input")} />
        )}
        {currentScreen === "input" && (
          <div className="text-center flex flex-col justify-between h-screen mx-4 items-center">
            <h2 className="font-bold mb-6 text-center font-lobster text-[4rem] text-white">
              Ajoutez les participants
            </h2>
            <ParticipantInput
              onAddParticipant={addParticipant}
              participants={participants}
              onRemoveParticipant={removeParticipant}
            />
            <div className="mb-10 w-full mx-auto">
              <SwipeButton
                onConfirm={distributeGifts}
                text="Glissez pour finir"
              />
            </div>
          </div>
        )}
        {currentScreen === "assignments" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Attributions des cadeaux
            </h2>
            <AssignmentDisplay assignments={assignments} />
            <div className="mt-6 max-w-md mx-auto">
              <SwipeButton
                onConfirm={resetApp}
                text="Glissez pour recommencer"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
