<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(localStorage.getItem("is_open") === null);
const scrollPosition = ref(localStorage.getItem("scroll_position") === null);
const mobile = ref(localStorage.getItem("is_mobile") === null);
const mobileNav = ref(localStorage.getItem("is_mobilenav") === null);
const windowWidth = ref(localStorage.getItem("window_width") === null);

// const isOpen = null;
// const scrollPosition = null;
// const mobile = null;
// // const mobileNav = isOpen;
// const mobileNav = null;
// const windowWidth = null;

const toggleMobileNav = () => {
  isOpen.value = !isOpen.value;
  mobileNav.value = !mobileNav.value;
  localStorage.setItem("is_open", isOpen.value);
  console.log("toggleMobileNav performed = " + mobileNav);
};

// function toggleMobileNav() {
//   isOpen.value = !isOpen.value;
//   mobileNav = !mobileNav;
//   localStorage.setItem("is_open", isOpen.value);
//   console.log("toggleMobileNav performed" + mobileNav);
// }

const isPageOpen = ref(false);
function pageIsOpen() {
  isPageOpen.value = true;
}

function pageIsClosed() {
  isPageOpen.value = false;
}

function checkScreenSize() {
  this.windowWidth = window.innerWidth;
  if (this.windowWidth <= 750) {
    this.mobile = true;
    this.localStorage.setItem("is_mobile", true);
    // this.mobileNav = true;
    console.log("checkScreenSize performed");
    console.log("const mobile = " + this.mobile);
    console.log("const scrollPosition = " + this.scrollPosition);
    console.log("const mobileNav = " + this.mobileNav);
    console.log("const windowWidth = " + this.windowWidth);
    return { mobile };
  }
  this.mobile = false;
  localStorage.setItem("is_mobile", this.mobile.value);
  this.mobileNav = false;
  console.log("checkScreenSize performed");
  console.log("const mobile = " + this.mobile);
  console.log("const scrollPosition = " + this.scrollPosition);
  console.log("const mobileNav = " + this.mobileNav);
  console.log("const windowWidth = " + this.windowWidth);
  return { mobile, mobileNav };
}

// created() {
//   window.addEventListener("resize", this.checkScreenSize);
//   this.checkScreenSize();
// }

onMounted(() => {
  window.addEventListener("resize", checkScreenSize);
  checkScreenSize;
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
  <div class="page-wrapper">
    <header :class="{ 'scrolled-nav': scrollPosition }">
      <nav>
        <!--       <div class="branding">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="125"
          height="125"
        />
      </div> -->
        <div
          v-show="!mobile"
          class="navigation-wrapper-top"
          :class="isPageOpen && 'page-is-open'"
        >
          <div class="navigation">
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'about' }"
              >About</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'instructor' }"
              >Instructor</RouterLink
            >
            <RouterLink
              @click="pageIsClosed"
              class="nav-btn"
              :to="{ name: 'home' }"
              >Home</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'classes' }"
              >Classes</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'contact' }"
              >Contact</RouterLink
            >
          </div>
        </div>

        <div
          v-show="!mobile"
          class="navigation-wrapper"
          :class="isPageOpen && 'page-is-open'"
        >
          <div class="navigation">
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'about' }"
              >About</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'instructor' }"
              >Instructor</RouterLink
            >
            <RouterLink
              @click="pageIsClosed"
              class="nav-btn"
              :to="{ name: 'home' }"
              >Home</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'classes' }"
              >Classes</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'contact' }"
              >Contact</RouterLink
            >
          </div>
        </div>

        <div
          @click="toggleMobileNav"
          v-show="mobile"
          class="mobile-nav-menu-btn"
          :class="{ 'mobile-nav-is-open': mobileNav }"
        >
          <div class="menu-btn_burger"></div>
        </div>

        <transition name="mobile-nav">
          <div v-show="mobileNav" class="navigation mobile">
            <RouterLink
              @click="toggleMobileNav"
              class="nav-btn"
              :to="{ name: 'about' }"
              >About</RouterLink
            >
            <RouterLink
              @click="toggleMobileNav"
              class="nav-btn"
              :to="{ name: 'instructor' }"
              >Instructor</RouterLink
            >
            <RouterLink
              @click="toggleMobileNav"
              class="nav-btn"
              :to="{ name: 'home' }"
              >Home</RouterLink
            >
            <RouterLink
              @click="toggleMobileNav"
              class="nav-btn"
              :to="{ name: 'classes' }"
              >Classes</RouterLink
            >
            <RouterLink
              @click="toggleMobileNav"
              class="nav-btn"
              :to="{ name: 'contact' }"
              >Contact</RouterLink
            >
          </div>
        </transition>
      </nav>
    </header>
  </div>
</template>

<style scoped>
header {
  line-height: var(--nav-btn-height);
  max-height: 100vh;
}
.page-wrapper {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  border: 1px solid orange;
  margin: auto;
  padding: 0;
  width: 100vw;
  max-width: 1400px;
  height: 100vh;
  overflow: hidden;
  z-index: 98;
}
.navigation-wrapper,
.navigation-wrapper-top {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 100vw;
  max-width: 1400px;
  background-color: rgba(0, 0, 0, 0.65);
  opacity: 1;
  transition: 0.5s ease-in-out;
  z-index: 99;
}
.navigation-wrapper-top {
  display: block;
  top: 0%;
  left: -100%;
  transform: translate(0%, 0%);
  width: 100%;
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.navigation-wrapper-top.page-is-open {
  display: block;
  top: 0%;
  left: 0%;
  transform: translate(0%, 0%);
  width: 100%;
  opacity: 1;
  transition: 0.5s ease-in-out;
}
.navigation {
  position: relative;
  margin: auto;
  max-width: 800px;
  padding: 0;
  width: 100%;
  overflow: hidden;
  /*border: 1px solid red;*/
}
.nav-btn {
  position: relative;
  display: inline-block;
  width: 20%;
  /*border-right: 0.25px solid rgba(70, 70, 70, 1);*/
  text-align: center;
}
/*.nav-btn:last-child {
  border-right: none;
}*/
.page-is-open {
  top: 50%;
  right: 150%;
  transform: translate(50%, -50%);
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.mobile-nav-menu-btn {
  position: fixed;
  display: flex;
  top: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 101;
  transition: all 0.5s ease-in-out;
  /* border: 3px solid #fff; */
}
.menu-btn_burger {
  position: absolute;
  width: 40px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  /*box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);*/
  transition: all 0.5s ease-in-out;
}
.menu-btn_burger::before,
.menu-btn_burger::after {
  content: "";
  position: absolute;
  width: 40px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  /*box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);*/
  transition: all 0.5s ease-in-out;
}
.menu-btn_burger::before {
  transform: translateY(-14px);
}
.menu-btn_burger::after {
  transform: translateY(14px);
}
/* ANIMATION */
.mobile-nav-menu-btn.mobile-nav-is-open .menu-btn_burger {
  transform: translateX(-50px);
  background: transparent;
  box-shadow: none;
}
.mobile-nav-menu-btn.mobile-nav-is-open .menu-btn_burger::before {
  transform: rotate(45deg) translate(35px, -35px);
}
.mobile-nav-menu-btn.mobile-nav-is-open .menu-btn_burger::after {
  transform: rotate(-45deg) translate(35px, 35px);
}

/* NAVIGATION */
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border-left: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.mobile {
  display: flex;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 1400px;
  height: 100vh;
  /*margin: auto;*/
  /*overflow-y: scroll;*/
  /*border: 2px solid green;*/
  background-color: rgba(0, 0, 0, 0.85);
  transition: 0.5s ease-in-out;
  z-index: 100;
}
.mobile a {
  border-left: none;
  /*height: 100vh;*/
  padding: 0 0;
  width: auto;
  /*width: 100%;*/
  /*line-height: calc(100vh * 0.12);*/
  margin-bottom: 10%;
}
</style>
