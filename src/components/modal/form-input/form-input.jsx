import React from "react";
import Dropdown from "../../dropdown/dropdown";
import "./form-input.scss";

const FormInput = (props) => {
  return (
    <React.Fragment>
      <label className="top" htmlFor={props.for}>
        {props.upperLabel}
      </label>
      {
        {
          input: (
            <input
              id={props.for}
              type={props.type}
              name={props.name}
              onChange={props.handleChange}
              value={props.value}
            />
          ),
          textArea: (
            <textarea
              id={props.for}
              type={props.type}
              name={props.name}
              onChange={props.handleChange}
              value={props.value}
            />
          ),
          dropdown: (
            <Dropdown
              id={props.for}
              value={props.value}
              listitems={props.data}
              toggleItem={props.handleChange}
            />
          ),
        }[props.inputType]
      }
      {/* <input id={props.for} type={props.type} name={props.name} onChange={props.handleChange}/> */}
      <label className="bottom" htmlFor="props.for">
        {props.bottomLabel}
      </label>
    </React.Fragment>
  );
};

export default FormInput;
