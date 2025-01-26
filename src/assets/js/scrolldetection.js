// scrollDetection.js
import { onMounted, onUnmounted } from "vue";

// detect scroll amount and scale or opacity change elements
export function scrollDetection() {
  function checkReadyToScroll() {
    const promise = new Promise((resolve, reject) => {
      if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", readyToScroll);
      } else {
        // `DOMContentLoaded` has already fired
        document.getElementById("zoom-me");
        document.getElementById("hero-title");
        document.getElementById("detect-scroll");
        document.getElementById("hero-title-sub");
        document.getElementById("main-content-wrapper-bkg-img-pattern");
        document.getElementById("main-content-headline-bkg");
        console.info("DOM loaded");
        console.log("Promise callback");
        resolve();
      }
    }).then((result) => {
      console.log("Promise callback (.then)");
      console.log("Got zoom-me");
      console.log("Got hero-title");
      console.log("Got app-wrapper");
      console.log("Got hero-title-sub");
      console.log("Got main-content-wrapper-bkg-img-pattern");
      console.log("Got main-content-headline-bkg");
    });

    setTimeout(() => {
      const zoomElement = document.getElementById("zoom-me");
      const pageHeroTitle = document.getElementById("hero-title");
      const pageHeroTitleSub = document.getElementById("hero-title-sub");
      const bkgPattern = document.getElementById(
        "main-content-wrapper-bkg-img-pattern"
      );
      const headlineBkg = document.getElementById("main-content-headline-bkg");
      document
        .getElementById("detect-scroll")
        .addEventListener("scroll", () => {
          const scrolled = document.getElementById("detect-scroll").scrollTop;
          console.log(scrolled);
          zoomElement.style.transform = `scale(${scrolled / 800 + 1})`;
          zoomElement.style.opacity = 1 - scrolled / 700 + "";
          pageHeroTitle.style.opacity = 1 - scrolled / 100 + "";
          pageHeroTitleSub.style.transform = `scale(${scrolled / 4500 + 1})`;
          pageHeroTitleSub.style.opacity = 0 + scrolled / 800 + "";
          bkgPattern.style.backgroundSize = 150 - scrolled / 30 + "%";
          bkgPattern.style.opacity = 0 + scrolled / 800 + "";
          headlineBkg.style.transform = `scale(${scrolled / 3000 + 1})`;
        });
      console.log("event-loop cycle: Promise (fulfilled)", promise);
    }, 250);

    console.log("Promise (pending)", promise);
  }
  checkReadyToScroll();
}

export function removeScrollListeners(readyToScroll, scrolled) {
  // remove listensers
  document.removeEventListener("DOMContentLoaded", readyToScroll);
  document.removeEventListener("scroll", scrolled);
}
