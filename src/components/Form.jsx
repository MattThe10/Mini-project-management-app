import { useRef } from "react";

export default function Form({ active, setFormActive, setProject }) {
  const labelStyle = "font-bold text-stone-600 uppercase";
  const divStyle = "flex flex-col";
  const inputStyle =
    "bg-stone-200 border-b-2 border-stone-300 focus:border-stone-800 outline-0";

  const title = useRef();
  const desc = useRef();
  const date = useRef();

  function handleForm() {
    setFormActive((prev) => !prev);
  }

  function saveForm(event) {
    event.preventDefault();
    setProject((prev) => [
      ...prev,
      {
        title: title.current.value,
        desc: desc.current.value,
        date: date.current.value,
        tasks: [],
      },
    ]);

    handleForm();
  }

  return (
    <form
      className={`flex flex-col w-[30vw] gap-3 ml-5 ${
        active ? "inline-block" : "hidden"
      }`}
    >
      <div className="flex flex-row gap-5 self-end">
        <button className="text-black" onClick={handleForm}>
          Cancel
        </button>
        <button
          className="bg-black text-white p-2 pl-6 pr-6 rounded"
          onClick={(event) => saveForm(event)}
        >
          Save
        </button>
      </div>
      <div className={divStyle}>
        <label className={labelStyle}>Title</label>
        <input type="text" className={inputStyle} ref={title} />
      </div>
      <div className={divStyle}>
        <label className={labelStyle}>Description</label>
        <input
          type="textarea"
          className={`h-[4rem] ${inputStyle}`}
          ref={desc}
        />
      </div>
      <div className={divStyle}>
        <label className={labelStyle}>Due Date</label>
        <input type="date" className={inputStyle} ref={date} />
      </div>
    </form>
  );
}
