import { scrollDetection } from "./scrolldetection.js";

// check if DOM element is read for Zoom scrolling effecrs
export function checkDOMzoomMe() {
  var element = document.getElementById("zoom-me");
  if (typeof element != "undefined" && element != null) {
    console.log("zoom-me exists");
    scrollDetection();
  } else {
    for (let i = 0; i < 2; i++) {
      var element = document.getElementById("zoom-me");

      if (typeof element == "undefined" && element == null) {
        console.log("still checking for zoom-me " + i);
      } else if (typeof element != "undefined" && element != null) {
        console.log("zoom-me exists");
        scrollDetection();
      }
    }
  }
}
