interface HeaderProps {
  resetActivities: () => void;
}

const Header = ({ resetActivities }: HeaderProps) => {
  return (
    <header className="bg-amber-500 p-5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-center text-xl font-bold text-white uppercase">
          Calculadora de calorias
        </h1>
        <button
          onClick={resetActivities}
          className="border border-white py-2 px-5 rounded-md text-white font-bold text-md md:text-xl mt-3 md:mt-0 hover:bg-amber-600"
        >
          Reiniciar
        </button>
      </div>
    </header>
  );
};

export default Header;
