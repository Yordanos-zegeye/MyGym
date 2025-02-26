import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../util/resource";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap">
        <p className="text-3xl sm:text-3xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-lg sm:text-2xl md:text-3xl mx-3">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto capitalize">{description}</p>
    </div>
  );
}

export default function Generator() {
  const [showModal, setModal] = useState(false);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  const toggleModal = () => {
    setModal(!showModal);
  };

  function updateMuscles(muscle) {
    if (muscles.includes(muscle)) {
      setMuscles(muscles.filter((val) => val !== muscle));
    }

    if (muscles.length > 2) {
      return;
    }

    setMuscles([...muscles, muscle]);
    if (poison !== "individual") {
      setMuscles([muscle]);
      return;
    }
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }
  return (
    <>
    <SectionWrapper
      header={"Generate your Workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              key={typeIndex}
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border border-blue-400 py-4 rounded-lg duration-200 hover:border-blue-600 " +
                (type === poison ? "border-blue-600" : "border-blue-400")
              }
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on Targets"}
        description={
          muscles.length
            ? muscles.join(" ")
            : "Select the Muscles judged for workout."
        }
      />
      <div className="bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg">
        <div className="relative flex items-center justify-center">
          <button onClick={toggleModal}>
            <p>Select muscle groups</p>
            <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
          </button>
        </div>
        {showModal && (
          <div className="flex flex-col">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscle, muscleIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscle);
                  }}
                  key={muscleIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscle) ? "text-blue-400" : " ")
                  }
                >
                  <p className="uppercase">{muscle}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become your deam you"}
        description={"Select your ultimate objective"}
      />
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={(scheme) => {
                setGoals(scheme);
              }}
              key={schemeIndex}
              className={
                "bg-slate-950 border  py-4 rounded-lg duration-200 hover:border-blue-600 " +
                (scheme === goals ? "border-blue-600" : "border-blue-400")
              }
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
    <Button text={"Formulate"}/>
    </>
  );
}
