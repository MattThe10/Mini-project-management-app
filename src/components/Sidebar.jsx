export default function Sidebar({
  setFormActive,
  projects,
  setDisplayedPage,
  setSelectedProject,
}) {
  function handleForm() {
    setFormActive((prev) => !prev);
  }

  function displayProject(title) {
    setDisplayedPage(true);
    setSelectedProject(title);
  }

  return (
    <div className="flex flex-col items-center bg-black rounded-tr-xl h-[100%] w-[20vw]">
      <h2 className="uppercase text-white text-3xl mt-5">Your projects</h2>
      <button
        onClick={handleForm}
        className="bg-stone-700 rounded-md text-stone-400 p-2 mt-5 mb-5"
      >
        + Add Project
      </button>
      <div className="flex flex-col">
        {projects.map((item) => {
          return (
            <button
              key={item.title}
              className="text-stone-500 font-bold focus:bg-stone-900 p-2 pl-6 pr-6"
              onClick={() => displayProject(item.title)}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
