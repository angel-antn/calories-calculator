import { ActivityList } from "./components/ActivityList";
import Form from "./components/Form";
import Header from "./components/Header";
import { CalorieTracker } from "./components/CalorieTracker";
import { useCaloriesCalc } from "./hooks/useCaloriesCalc";

function App() {
  const {
    newActivity,
    setNewActivity,
    newActivityIsValid,
    submitNewActivity,
    getCategoryName,
    selectActivity,
    unselectActivity,
    deleteActivity,
    totalCalories,
    resetActivities,
  } = useCaloriesCalc();

  return (
    <>
      <Header resetActivities={resetActivities} />
      <Form
        newActivity={newActivity}
        setNewActivity={setNewActivity}
        newActivityIsValid={newActivityIsValid}
        submitNewActivity={submitNewActivity}
        unselectActivity={unselectActivity}
      />
      <CalorieTracker totalCalories={totalCalories} />
      <ActivityList
        getCategoryName={getCategoryName}
        selectActivity={selectActivity}
        deleteActivity={deleteActivity}
      />
    </>
  );
}

export default App;
