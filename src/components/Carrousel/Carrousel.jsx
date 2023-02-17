import React, {useRef, useEffect, useState} from "react";

import "./carrousel.css";

export default (props) => {
    const carrousel = useRef();
    const [state, setState] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        if(state == true)
        {
          carrousel.current.scrollLeft += carrousel.current.offsetWidth;
          setState(false);
        }
        else{
          carrousel.current.scrollLeft -= carrousel.current.offsetWidth;
          setState(true);
        }
      }, 5000)
    })

  return (
    <>
      <div ref={carrousel} className="carrousel">{props.children}</div>
    </>
  );
};
