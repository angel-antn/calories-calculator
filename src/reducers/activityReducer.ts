import { Activity } from "../interfaces/activityInterface";

// actions

interface SaveActivityAction {
  type: "save-activity";
  payload: { newActivity: Activity };
}

interface SetActiveIdAction {
  type: "save-active-id";
  payload: { activityId: Activity["id"] };
}

interface CleanActiveIdAction {
  type: "clean-active-id";
}

interface DeleteActivityAction {
  type: "delete-activity";
  payload: { activityId: Activity["id"] };
}

interface ResetActivityAction {
  type: "reset-activities";
}

export type ActivityActions =
  | SaveActivityAction
  | SetActiveIdAction
  | CleanActiveIdAction
  | DeleteActivityAction
  | ResetActivityAction;

// state

export interface ActivityState {
  activities: Activity[];
  activeId: Activity["id"];
}

export const initialState: ActivityState = {
  activities: JSON.parse(
    localStorage.getItem("activities") ?? "[]"
  ) as Activity[],
  activeId: "",
};

// reducer

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState => {
  switch (action.type) {
    case "save-activity": {
      const calories =
        action.payload.newActivity.category == 1
          ? action.payload.newActivity.calories
          : action.payload.newActivity.calories * -1;

      let newActivities: Activity[] = [];

      if (state.activeId) {
        newActivities = state.activities.map((activityToEdit) => {
          if (activityToEdit.id === state.activeId) {
            return { ...action.payload.newActivity, calories };
          }
          return activityToEdit;
        });
      } else {
        newActivities = [
          ...state.activities,
          {
            ...action.payload.newActivity,
            calories,
          },
        ];
      }

      return {
        ...state,
        activities: newActivities,
        activeId: "",
      };
    }

    case "save-active-id": {
      return {
        ...state,
        activeId: action.payload.activityId,
      };
    }

    case "clean-active-id": {
      return {
        ...state,
        activeId: "",
      };
    }

    case "delete-activity": {
      return {
        ...state,
        activities: state.activities.filter(
          (activityToDelete) =>
            activityToDelete.id !== action.payload.activityId
        ),
      };
    }

    case "reset-activities": {
      return { activities: [], activeId: "" };
    }

    default: {
      return state;
    }
  }
};
