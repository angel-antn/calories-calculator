import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Category } from "../interfaces/categoryInterface";
import useActivities from "../hooks/useActivities";

interface ActivityListProps {
  getCategoryName: (category: Category["id"]) => string;
  selectActivity: (activityId: string) => void;
  deleteActivity: (activityId: string) => void;
}

export const ActivityList = ({
  getCategoryName,
  selectActivity,
  deleteActivity,
}: ActivityListProps) => {
  const { state } = useActivities();
  return (
    <section className="p-10 mx-auto max-w-4xl">
      <h2 className="text-4xl font-bold text-gray-500 text-center mb-10">
        Comida y Actividades
      </h2>

      {state.activities.length === 0 && (
        <div className="border-4 border-gray-200 border-dashed  rounded-lg">
          <p className="text-center text-gray-400 text-xl md:text-2xl px-5 md:px-20 py-10">
            Registra nuevas actividades para llevar el control de tus calorias
          </p>
        </div>
      )}

      {state.activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex flex-col md:flex-row justify-between rounded-lg shadow-xl"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-red-500" : "bg-blue-600"
              }`}
            >
              {getCategoryName(activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.activity}</p>
            <p className="font-black text-4xl text-amber-500">
              {`${activity.calories} `}
              <span>Calorias</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 items-center justify-center mt-5 md:mt-0 ">
            <button
              className="bg-amber-50 py-2 rounded-full hover:bg-amber-100 flex justify-center items-center gap-3 w-full md:w-56 shadow-sm"
              onClick={() => selectActivity(activity.id)}
            >
              <PencilSquareIcon className="h-9 w-9 text-amber-500" />
              <p className="text-amber-500 text-xl font-semibold">Editar</p>
            </button>

            <button
              className="bg-red-50 py-2 rounded-full hover:bg-red-100 flex justify-center items-center gap-3 w-full md:w-56 shadow-sm"
              onClick={() => deleteActivity(activity.id)}
            >
              <XCircleIcon className="h-9 w-9 text-red-400" />
              <p className="text-red-400 text-xl font-semibold">Eliminar</p>
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
