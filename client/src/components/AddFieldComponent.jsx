import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({close, value, onChange, submit}) => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold ">Add Field</h1>
          <button onClick={close}>
            <IoClose size={20} />
          </button>
        </div>
        <input
          type="text"
          className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-100 rounded w-full"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />
        <button onSubmit={submit} className="bg-primary-200 px-4 py-2 hover:bg-primary-100 rounded mx-auto w-fit block">
            Add Field
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
