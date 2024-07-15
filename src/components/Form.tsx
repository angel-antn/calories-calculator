import { categories } from "../data/categories";
import { Activity } from "../interfaces/activityInterface";
import useActivities from "../hooks/useActivities";

interface formProps {
  setNewActivity: React.Dispatch<React.SetStateAction<Activity>>;
  newActivity: Activity;
  newActivityIsValid: boolean;
  submitNewActivity: (e: React.FormEvent<HTMLFormElement>) => void;
  unselectActivity: () => void;
}

const Form = ({
  newActivity,
  setNewActivity,
  newActivityIsValid,
  submitNewActivity,
  unselectActivity,
}: formProps) => {
  const { state } = useActivities();
  return (
    <section className="formBg py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <form
          className=" bg-white shadow-md rounded-lg p-10 "
          onSubmit={submitNewActivity}
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-3">
              <label htmlFor="category">Categoría:</label>
              <select
                className="border border-slate-200 p-2 rounded-lg w-full bg-white"
                id="category"
                onChange={(e) =>
                  setNewActivity({ ...newActivity, category: +e.target.value })
                }
                value={newActivity.category}
              >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <label htmlFor="activity">Nombre:</label>
              <input
                className="border border-slate-200 p-2 rounded-lg w-full bg-white"
                type="text"
                id="activity"
                placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                onChange={(e) =>
                  setNewActivity({ ...newActivity, activity: e.target.value })
                }
                value={newActivity.activity}
              />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <label htmlFor="calories">{`Calorias ${
                newActivity.category === 1 ? "ingeridas" : "quemadas"
              }:`}</label>
              <input
                className="border border-slate-200 p-2 rounded-lg w-full bg-white"
                type="number"
                id="calories"
                placeholder="Calorias, Ej. 300 o 500"
                onChange={(e) =>
                  setNewActivity({ ...newActivity, calories: +e.target.value })
                }
                value={newActivity.calories}
              />
            </div>
          </div>
          <input
            type="submit"
            className="mt-10 bg-amber-600 enabled:shadow-md enabled:hover:bg-amber-700 p-3 font-bold uppercase text-white w-full cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-default "
            value={`Guardar ${
              newActivity.category == 1 ? "comida" : "ejercicio"
            }`}
            disabled={!newActivityIsValid}
          />
          {state.activeId && (
            <input
              type="submit"
              className="mt-5 bg-amber-400 hover:bg-amber-500 p-3 font-bold uppercase text-white w-full cursor-pointer rounded-full border-amber-500 shadow-md"
              value="Regresar"
              onClick={unselectActivity}
            />
          )}
        </form>
      </div>
    </section>
  );
};

export default Form;
