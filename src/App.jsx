import Sidebar from "./components/Sidebar.jsx";
import Form from "./components/Form.jsx";
import Project from "./components/Project.jsx";
import { useState } from "react";
import notesImage from "./assets/no-projects.png";

function App() {
  const [formActive, setFormActive] = useState(false);
  const [displayedPage, setDisplayedPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [project, setProject] = useState([]);

  function addTask(projectTitle, taskTitle) {
    setProject((prev) =>
      prev.map((project) =>
        project.title === projectTitle
          ? {
              ...project,
              tasks: [...project.tasks, { id: Date.now(), title: taskTitle }],
            }
          : project
      )
    );
  }

  function deleteTask(projectTitle, taskId) {
    setProject((prev) =>
      prev.map((project) =>
        project.title === projectTitle
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
  }

  function handleForm() {
    setFormActive((prev) => !prev);
  }

  function deleteProject(title) {
    setProject((prev) => prev.filter((item) => item.title !== title));
    setDisplayedPage(false);
    setSelectedProject(null);
  }

  const defaultPage = (
    <div className="flex flex-col items-center justify-center w-[80%] h-[100%] gap-2">
      <img src={notesImage} alt="Notes" className="w-[8rem]" />
      <h1 className="font-bold text-stone-600 text-3xl">No Project Selected</h1>
      <p className="text-stone-500">
        Select a project or get started with a new one
      </p>
      <button
        className="bg-stone-600 text-stone-400 p-2 pr-6 pl-6 rounded-md"
        onClick={handleForm}
      >
        Create new project
      </button>
    </div>
  );

  return (
    <div className="flex flex-row items-center h-[100vh] w-[100vw]">
      <Sidebar
        setFormActive={setFormActive}
        projects={project}
        setDisplayedPage={setDisplayedPage}
        setSelectedProject={setSelectedProject}
      ></Sidebar>
      <div
        className="flex flex-row items-center h-[100vh] w-[100vw] justify-center"
        id="main-wrapper"
      >
        {formActive ? (
          <Form
            active={formActive}
            setFormActive={setFormActive}
            setProject={setProject}
          ></Form>
        ) : displayedPage ? (
          project
            .filter((item) => item.title == selectedProject)
            .map((item) => (
              <Project
                key={item.title}
                title={item.title}
                desc={item.desc}
                date={item.date}
                tasks={item.tasks}
                deleteProject={() => deleteProject(item.title)}
                addTask={(taskTitle) => addTask(item.title, taskTitle)}
                deleteTask={(taskId) => deleteTask(item.title, taskId)}
              ></Project>
            ))
        ) : (
          defaultPage
        )}
      </div>
    </div>
  );
}

export default App;
