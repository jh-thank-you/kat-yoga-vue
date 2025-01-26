<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted, onUnmounted, computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const isOpen = ref(localStorage.getItem("is_open") === "true");

const scrollPosition = ref(localStorage.getItem("scroll_position") === "true");

const mobile = ref(localStorage.getItem("is_mobile") === "true");

const mobileNav = ref(localStorage.getItem("is_mobilenav") === "true");

const isPageOpen = ref(localStorage.getItem("is_page_open") === "true");

const windowWidth = ref(null);

const toggleMobileNav = () => {
  isOpen.value = !isOpen.value;
  mobileNav.value = !mobileNav.value;

  localStorage.setItem("is_open", isOpen.value);
  localStorage.setItem("is_mobilenav", mobileNav.value);

  console.log("toggleMobileNav performed = " + mobileNav);
  checkScreenSize();
};

function pageIsOpen() {
  isPageOpen.value = true;
  localStorage.setItem("is_page_open", isPageOpen.value);
}

function pageIsClosed() {
  isPageOpen.value = false;
  localStorage.setItem("is_page_open", isPageOpen.value);
}

function pageIsOpenMobile() {
  isPageOpen.value = true;
  localStorage.setItem("is_page_open", isPageOpen.value);
  toggleMobileNav();
}

function pageIsOpenMobileHome() {
  isPageOpen.value = false;
  localStorage.setItem("is_page_open", isPageOpen.value);
  toggleMobileNav();
}

const checkScreenSize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 750) {
    mobile.value = true;
    localStorage.setItem("is_mobile", isPageOpen.value);
    console.log("mobile-true(<=750)-checkScreenSize performed");
    console.log("const mobile = " + mobile.value);
    console.log("const scrollPosition = " + scrollPosition.value);
    console.log("const mobileNav = " + mobileNav.value);
    console.log("const windowWidth = " + windowWidth.value);
    return { mobile };
  } else if (
    mobile.value == true &&
    mobileNav.value == true &&
    windowWidth.value >= 751
  ) {
    // do nothing //
    return;
  }
  mobile.value = false;
  localStorage.setItem("is_mobile", isPageOpen.value);
  mobileNav.value = false;
  localStorage.setItem("is_mobilenav", mobileNav.value);
  console.log("mobile-flase-checkScreenSize performed");
  console.log("const mobile = " + mobile.value);
  console.log("const scrollPosition = " + scrollPosition.value);
  console.log("const mobileNav = " + mobileNav.value);
  console.log("const windowWidth = " + windowWidth.value);
  return { mobile, mobileNav };
};

const { t, locale } = useI18n();

onMounted(() => {
  window.addEventListener("resize", checkScreenSize);
  console.log("onMounted - checkScreenSize performed");
  checkScreenSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
  <div class="page-wrapper">
    <header :class="{ 'scrolled-nav': scrollPosition }">
      <nav>
        <div
          v-show="!mobile"
          class="navigation-wrapper-top"
          :class="{ 'page-is-open': $route.path !== '/' }"
        >
          <div class="navigation">
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'about' }"
              >{{ t("aboutNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'instructor' }"
              >{{ t("instructorNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsClosed"
              class="nav-btn"
              :to="{ name: 'home' }"
              >{{ t("homeNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'classes' }"
              >{{ t("classesNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'contact' }"
              >{{ t("contactNavBtn") }}</RouterLink
            >
          </div>
        </div>

        <div
          v-show="!mobile"
          class="navigation-wrapper"
          :class="{ 'page-is-open': $route.path !== '/' }"
        >
          <div class="navigation">
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'about' }"
              >{{ t("aboutNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'instructor' }"
              >{{ t("instructorNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsClosed"
              class="nav-btn"
              :to="{ name: 'home' }"
              >{{ t("homeNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'classes' }"
              >{{ t("classesNavBtn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'contact' }"
              >{{ t("contactNavBtn") }}</RouterLink
            >
          </div>
        </div>

        <div
          class="mobile-nav-wrapper"
          v-show="mobile"
          :class="{ 'mobile-nav-open': mobileNav }"
        >
          <div class="mobile-nav-branding">
            <span class="logo"></span
            ><span class="company-name">{{ t("companyName") }}</span>
          </div>
          <div
            @click="toggleMobileNav"
            v-show="mobile"
            class="mobile-nav-menu-btn"
            :class="{ 'mobile-nav-is-open': mobileNav }"
          >
            <div class="menu-btn_burger"></div>
          </div>

          <Teleport to="body">
            <transition name="mobile-nav">
              <div v-show="mobileNav" class="navigation mobile">
                <div class="mobile-nav-top-spacer"></div>
                <RouterLink
                  @click="pageIsOpenMobile"
                  class="nav-btn"
                  :to="{ name: 'about' }"
                  ><span class="mobile-icon mobile-about"></span
                  >{{ t("aboutNavBtn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpenMobile"
                  class="nav-btn"
                  :to="{ name: 'instructor' }"
                  ><span class="mobile-icon mobile-instructor"></span
                  >{{ t("instructorNavBtn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpenMobileHome"
                  class="nav-btn"
                  :to="{ name: 'home' }"
                  ><span class="mobile-icon mobile-home"></span
                  >{{ t("homeNavBtn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpenMobile"
                  class="nav-btn"
                  :to="{ name: 'classes' }"
                  ><span class="mobile-icon mobile-classes"></span
                  >{{ t("classesNavBtn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpenMobile"
                  class="nav-btn"
                  :to="{ name: 'contact' }"
                  ><span class="mobile-icon mobile-contact"></span
                  >{{ t("contactNavBtn") }}</RouterLink
                >
              </div>
            </transition>
          </Teleport>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  opacity: 1;
  transition: 0.5s ease opacity;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
}

header {
  line-height: var(--nav-btn-height);
  max-height: 85px;
}
.page-wrapper {
  position: fixed;
  top: 0;
  right: 50%;
  transform: translate(50%, -0);
  border: 3px solid purple;
  margin: auto;
  padding: 0;
  width: 100vw;
  max-width: 1400px;
  height: 85px;
  max-height: 85px;
  overflow: hidden;
  z-index: 98;
}
.navigation-wrapper,
.navigation-wrapper-top {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 100%;
  max-width: 1400px;
  background-color: var(--nav-background);
  opacity: 1;
  transition: all 0.5s ease-in-out;
  z-index: 99;
}
.navigation-wrapper-top {
  display: block;
  top: 0%;
  left: -100%;
  transform: translate(0%, 0%);
  width: 100%;
  height: 65px;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.navigation-wrapper-top.page-is-open {
  display: block;
  top: 0%;
  left: 0%;
  transform: translate(0%, 0%);
  width: 100%;
  opacity: 1;
  transition: all 0.5s ease-in-out;
}
.navigation {
  display: block;
  position: relative;
  margin: auto;
  max-width: 800px;
  padding: 0;
  width: 100%;
  overflow: hidden;
}
.navigation-wrapper-top .navigation a {
  line-height: 65px;
}
.navigation.mobile {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  height: 100%;
  overflow: scroll;
  z-index: 97;
}
/* HIDE SCROLLBAR for Chrome, Safari and Opera */
.navigation.mobile::-webkit-scrollbar {
  display: none;
}

/* HIDE SCROLLBAR for IE, Edge and Firefox */
.navigation.mobile {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.nav-btn {
  position: relative;
  display: inline-block;
  width: 20%;
  /*border-right: 0.25px solid rgba(70, 70, 70, 1);*/
  text-align: center;
}
.page-is-open {
  top: 50%;
  right: 150%;
  transform: translate(50%, -50%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.mobile-nav-wrapper {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  /*background-color: var(--nav-background);*/
  z-index: 101;
  transition: all 0.5s ease-in-out;
}
.mobile-nav-wrapper.mobile-nav-open {
  background-color: none;
  transition: all 0.5s ease-in-out;
}
.mobile-nav-branding {
  display: block;
  position: relative;
  top: 10px;
  left: 25px;
  width: 35%;
  height: 65px;
  padding: 0;
  border: 2px solid orange;
}
.mobile-nav-branding .logo {
  display: block;
  position: absolute;
  left: 0;
  min-width: 65px;
  max-width: 65px;
  height: 100%;
  border: 1px solid red;
}
.mobile-nav-branding .company-name {
  display: inline-block;
  position: relative;
  font-size: 1rem;
  height: 100%;
  top: 0;
  margin-left: 25px;
  border: 1px solid red;
}
.mobile-nav-menu-btn {
  position: absolute;
  display: block;
  top: 38px;
  right: 20px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 103;
  transition: all 0.5s ease-in-out;
}
.menu-btn_burger {
  position: absolute;
  display: flex;
  width: 30px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  /*box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);*/
  transition: all 0.5s ease-in-out;
}
.menu-btn_burger::before,
.menu-btn_burger::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  /*box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);*/
  transition: all 0.5s ease-in-out;
}
.menu-btn_burger::before {
  transform: translateY(-11px);
}
.menu-btn_burger::after {
  transform: translateY(11px);
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
  border-bottom: 3px solid transparent;
}

.navigation.mobile a.router-link-exact-active {
  color: var(--nav-btn-text);
}

.navigation.mobile a.router-link-exact-active:hover {
  border-color: hsla(160, 100%, 37%, 1);
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

  /*header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }*/

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
@media (max-width: 1023px) {
  nav {
    font-size: 1.2rem;
  }
}
.mobile {
  display: block;
  position: fixed;
  width: 100vw;
  max-width: 1400px;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--nav-background);
  transition: background-color 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
  z-index: 100;
}
.mobile a {
  border-left: none;
  padding: 0 0;
  width: auto;
  width: 100%;
  line-height: calc(4vh);
  margin-bottom: 5%;
}
.mobile-icon {
  display: block;
  margin: auto;
  margin-bottom: 10px;
  width: 35px;
  height: 35px;
  background-color: orange;
}
.mobile-nav-top-spacer {
  position: relative;
  display: block;
  top: 0px;
  height: 21vh;
  min-height: 95px;
  width: 100vw;
  border: 1px solid red;
}
</style>
