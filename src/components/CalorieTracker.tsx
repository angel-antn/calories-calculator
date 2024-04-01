interface CalorieTrackerProps {
  totalCalories: number;
}

export const CalorieTracker = ({ totalCalories }: CalorieTrackerProps) => {
  return (
    <>
      {true && (
        <div
          className={`calorieTrackerBg  ${
            totalCalories > 0
              ? "bg-red-500"
              : totalCalories == 0
              ? "bg-amber-600"
              : "bg-blue-500 "
          }  py-10 text-white text-4xl text-center px-5 transition-all duration-300`}
        >
          <p className=" font-bold mb-5">Resumen de calorias: </p>
          <p>{`${Math.abs(totalCalories)} ${
            totalCalories > 0 ? "calorias consumidas" : "calorias quemadas"
          }`}</p>
        </div>
      )}
    </>
  );
};
