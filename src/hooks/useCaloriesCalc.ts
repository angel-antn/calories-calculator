import { useEffect, useMemo, useReducer, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Activity } from "../interfaces/activityInterface";
import {
  ActivityActions,
  ActivityState,
  activityReducer,
  initialState,
} from "../reducers/activityReducer";

import { categories } from "../data/categories";

export const useCaloriesCalc = () => {
  const [activitiesState, activitiesDispatch] = useReducer<
    React.Reducer<ActivityState, ActivityActions>
  >(activityReducer, initialState);

  const newActivityInitialState: Activity = {
    id: uuidv4(),
    category: 1,
    activity: "",
    calories: 0,
  };

  const [newActivity, setNewActivity] = useState<Activity>(
    newActivityInitialState
  );

  useEffect(() => {
    if (activitiesState.activeId) {
      const editableActivity = activitiesState.activities.find(
        (activity) => activity.id === activitiesState.activeId
      )!;
      setNewActivity({
        ...editableActivity,
        calories: Math.abs(editableActivity.calories),
      });
    }
  }, [activitiesState]);

  useEffect(() => {
    localStorage.setItem(
      "activities",
      JSON.stringify(activitiesState.activities)
    );
  }, [activitiesState.activities]);

  const resetInitialState = () =>
    setNewActivity({ ...newActivityInitialState, id: uuidv4() });

  const newActivityIsValid = useMemo<boolean>(() => {
    return newActivity.activity.trim() !== "" && newActivity.calories > 0;
  }, [newActivity]);

  const submitNewActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    activitiesDispatch({
      type: "save-activity",
      payload: { newActivity },
    });
    resetInitialState();
  };

  const getCategoryName = (category: Activity["category"]) => {
    return (
      categories[
        categories.findIndex((categoryData) => categoryData.id === category)
      ].name ?? ""
    );
  };

  const selectActivity = (activityId: string) => {
    activitiesDispatch({ type: "save-active-id", payload: { activityId } });
  };

  const unselectActivity = () => {
    activitiesDispatch({ type: "clean-active-id" });
    resetInitialState();
  };

  const deleteActivity = (activityId: string) => {
    activitiesDispatch({ type: "delete-activity", payload: { activityId } });
  };

  const canRefresh = useMemo(
    () => activitiesState.activities.length !== 0,
    [activitiesState]
  );

  const resetActivities = () => {
    if (canRefresh) {
      activitiesDispatch({ type: "reset-activities" });
    }
  };

  const totalCalories = useMemo(
    () =>
      activitiesState.activities.reduce(
        (acum, activity) => acum + activity.calories,
        0
      ),
    [activitiesState.activities]
  );

  return {
    newActivity,
    setNewActivity,
    newActivityIsValid,
    submitNewActivity,
    activitiesState,
    getCategoryName,
    selectActivity,
    unselectActivity,
    deleteActivity,
    resetActivities,
    totalCalories,
  };
};
