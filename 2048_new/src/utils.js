import { useEffect } from "react";

export const useEvent = (event, handler, passive = false) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    }
  })
}


export const getColors = (num) => {
  switch (num) {
    case 2:
      return "#EBDCD0";
    case 4:
      return "#d4e3a4";
    case 8:
      return "#c8db89";
    case 16:
      return "#bbd36d";
    case 32:
      return "#aecb52";
    case 64:
      return "#a0c039";
    case 128:
      return "#89a431";
    case 256:
      return "#728929";
    case 512:
      return "#5b6d21";
    case 1024:
      return "#445218";
    case 2048:
      return "#2d3610";
    default:
      return "#C2B3A3";
  }
};


