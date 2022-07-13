import React, { useState, useRef } from "react";

import "./Accordion.css";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  function addSection() {

  }

  return (
    
    // Here, if props have secret words, then it will show us Button to add new element
    <div className="accordion__section">
      {props.title !== 'StasSAO' &&
        <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
          <p className="accordion__title">{props.title}</p>
          <i className={`${setRotate}`} width={10} fill={"#777"} />
        </button>
      ||
        <button className={`accordion ${setActive}`} onClick={addSection}>
          <p className="accordion__title">Add</p>
        </button>
        
      }

      {props.content !== 'SecretKFCBullshit' &&
              <div
              ref={content}
              style={{ maxHeight: `${setHeight}` }}
              className="accordion__content"
            >
              <div
                className="accordion__text"
                dangerouslySetInnerHTML={{ __html: props.content }}
              />
              {console.log(props.content)}
            </div>
      }
    </div>
  );
}

export default Accordion;