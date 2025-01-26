<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const isOpen = ref(localStorage.getItem("is_open") === "true");

const scrollPosition = ref(localStorage.getItem("scroll_position") === "true");

const mobile = ref(localStorage.getItem("is_mobile") === "true");
const mobileHomeNav = ref(localStorage.getItem("is_mobileHomeNav") === "true");

const router = useRouter();

const favicon = document.getElementById("favicon");
// for final production remove "/dev/katyoga" from the href
favicon.href = router.currentRoute.value.faviconhref;

const currentRoute = computed(() => {
  return router.currentRoute.value.name;
});
console.log("first run - currentRoute = " + currentRoute.value);

const mobileNav = ref(localStorage.getItem("is_mobilenav") === "true");

const isPageOpen = ref(localStorage.getItem("is_page_open") === "true");

const windowWidth = ref(null);

const toggleMobileNav = () => {
  isOpen.value = !isOpen.value;
  mobileNav.value = !mobileNav.value;

  localStorage.setItem("is_open", isOpen.value);
  localStorage.setItem("is_mobilenav", mobileNav.value);

  console.log("toggleMobileNav performed = " + mobileNav.value);
  checkScreenSize();
};

const pageIsOpen = () => {
  isPageOpen.value = true;
  localStorage.setItem("is_page_open", isPageOpen.value);
};

const pageIsClosed = () => {
  isPageOpen.value = false;
  localStorage.setItem("is_page_open", isPageOpen.value);
};

const pageIsOpenMobile = () => {
  isPageOpen.value = true;
  localStorage.setItem("is_page_open", isPageOpen.value);
  toggleMobileNav();
};

const pageIsOpenMobileHomeNav = () => {
  isPageOpen.value = false;
  localStorage.setItem("is_page_open", isPageOpen.value);
  toggleMobileNav();
};

const getScrollBarWidth = () => {
  const navWrapperTop = document.getElementById("navigation-wrapper-top");

  let el = document.createElement("div");
  el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
  document.body.appendChild(el);
  let scrollBarThickness = el.offsetWidth - el.clientWidth;
  let viewportWidth = window.innerWidth;
  let navTopWidth = viewportWidth - scrollBarThickness;
  console.log("navTopWidth = " + navTopWidth);
  // set the fixed position top nav width so it does not overlap the scrollbar
  navWrapperTop.style.width = navTopWidth + "px";
  el.remove();
};

const checkScreenSize = (currentRoute) => {
  windowWidth.value = window.innerWidth;
  // getScrollBarWidth();
  if (windowWidth.value <= 750) {
    if ((currentRoute = "home")) {
      mobile.value = true;
      localStorage.setItem("is_mobile", isPageOpen.value);
      mobileHomeNav.value = true;
      localStorage.setItem("is_mobileHomeNav", mobileHomeNav.value);
      console.log("mobile-true(<=750)-checkScreenSize performed");
      console.log("const mobile = " + mobile.value);
      console.log("const scrollPosition = " + scrollPosition.value);
      console.log("const mobileNav = " + mobileNav.value);
      console.log("const windowWidth = " + windowWidth.value);
      console.log("const mobileHomeNav = " + mobileHomeNav.value);
      // pageIsOpen();

      return { mobile, mobileHomeNav };
    }
    mobile.value = true;
    localStorage.setItem("is_mobile", isPageOpen.value);
    mobileHomeNav.value = false;
    localStorage.setItem("is_mobileHomeNav", mobileHomeNav.value);
    console.log("mobile-true(<=750)-checkScreenSize performed");
    console.log("const mobile = " + mobile.value);
    console.log("const scrollPosition = " + scrollPosition.value);
    console.log("const mobileNav = " + mobileNav.value);
    console.log("const windowWidth = " + windowWidth.value);
    console.log("const mobileHomeNav = " + mobileHomeNav.value);
    return { mobile, mobileHomeNav };
  } else if (mobileNav.value == true && windowWidth.value >= 751) {
    console.log("auto toggle mobile nav closed");
    // mobile.value = false;
    // localStorage.setItem("is_mobile", isPageOpen.value);
    toggleMobileNav();
  }
  // mobile.value = false;
  // localStorage.setItem("is_mobile", isPageOpen.value);
  // mobileNav.value = false;
  // localStorage.setItem("is_mobilenav", mobileNav.value);
  // mobileHomeNav.value = false;
  // localStorage.setItem("is_mobileHomeNav", mobileHomeNav.value);
  console.log("mobile-flase-checkScreenSize performed");
  console.log("const mobile = " + mobile.value);
  console.log("const scrollPosition = " + scrollPosition.value);
  console.log("const mobileNav = " + mobileNav.value);
  console.log("const windowWidth = " + windowWidth.value);
  console.log("const mobileHomeNav = " + mobileHomeNav.value);
  return { mobile, mobileNav, mobileHomeNav };
};

const { t } = useI18n();

onMounted(() => {
  if (currentRoute !== "home" && isPageOpen.value !== true) {
    // setting logic to catch direct URL to individual
    // section pages so the top nav loads properly
    isPageOpen.value = true;
    localStorage.setItem("is_page_open", isPageOpen.value);
  }

  window.addEventListener("resize", checkScreenSize);
  console.log("onMounted - checkScreenSize performed");
  checkScreenSize();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize, getScrollBarWidth);
});
</script>
<template>
  <div
    class="page-wrapper"
    :class="{
      'page-is-open': $route.name !== 'home',
      'mobile-nav-open': mobileNav,
    }"
  >
    <header :class="{ 'scrolled-nav': scrollPosition }">
      <nav>
        <transition-group name="mobile-nav" mode="out-in">
          <div
            id="navigation-wrapper-top"
            key="mobileNavFalse00"
            class="navigation-wrapper-top"
            :class="{
              'mobile-nav-open': mobileHomeNav,
              'page-about': $route.name == 'about',
              'page-instructor': $route.name == 'instructor',
              'page-classes': $route.name == 'classes',
              'page-contact': $route.name == 'contact',
              'page-error': $route.name == 'error',
              'page-about move-nav-back-down':
                $route.name == 'about' && !isPageOpen,
              'page-instructor move-nav-back-down':
                $route.name == 'instructor' && !isPageOpen,
              'page-classes move-nav-back-down':
                $route.name == 'classes' && !isPageOpen,
              'page-contact move-nav-back-down':
                $route.name == 'contact' && !isPageOpen,
              'page-error move-nav-back-down':
                $route.name == 'error' && !isPageOpen,
              'move-nav-back-down': !mobileNav,
              'move-nav-back-up': mobileNav,
              'move-nav-back-up': $route.name == 'home' && !isPageOpen,
            }"
          >
            <transition name="mobile-nav" mode="out-in">
              <div key="mobileNavFalse01" class="navigation">
                <RouterLink
                  @click="pageIsOpen"
                  class="nav-btn"
                  :to="{ name: 'about' }"
                  >{{ t("about-nav-btn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpen"
                  class="nav-btn"
                  :to="{ name: 'instructor' }"
                  >{{ t("instructor-nav-btn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsClosed"
                  class="nav-btn home-btn-top"
                  :to="{ name: 'home' }"
                  >{{ t("home-nav-btn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpen"
                  class="nav-btn"
                  :to="{ name: 'classes' }"
                  >{{ t("classes-nav-btn") }}</RouterLink
                >
                <RouterLink
                  @click="pageIsOpen"
                  class="nav-btn"
                  :to="{ name: 'contact' }"
                  >{{ t("contact-nav-btn") }}</RouterLink
                >
              </div>
            </transition>
          </div>
        </transition-group>

        <div
          key="mobileNavFlase02"
          class="navigation-wrapper"
          :class="{
            'page-is-open': $route.name !== 'home',
          }"
        >
          <div key="01" class="navigation">
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'about' }"
              >{{ t("about-nav-btn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'instructor' }"
              >{{ t("instructor-nav-btn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsClosed"
              class="nav-btn home-btn hide-me"
              :to="{ name: 'home' }"
              >{{ t("home-nav-btn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'classes' }"
              >{{ t("classes-nav-btn") }}</RouterLink
            >
            <RouterLink
              @click="pageIsOpen"
              class="nav-btn"
              :to="{ name: 'contact' }"
              >{{ t("contact-nav-btn") }}</RouterLink
            >
          </div>
        </div>

        <transition name="mobile-nav" mode="out-in">
          <div
            class="mobile-nav-wrapper"
            key="mobileNavTrue"
            :class="{
              'mobile-nav-show': mobile,
              'mobile-nav-open': mobileNav,
              'page-home': $route.name == 'home',
              'page-about': $route.name == 'about',
              'page-instructor': $route.name == 'instructor',
              'page-classes': $route.name == 'classes',
              'page-contact': $route.name == 'contact',
              'page-error': $route.name == 'error',
            }"
          >
            <div key="02" class="navigation">
              <div
                class="mobile-nav-branding"
                :class="{ 'mobile-nav-open': mobileNav }"
              >
                <RouterLink
                  @click="pageIsClosed"
                  class="company-name"
                  :to="{ name: 'home' }"
                  ><span class="company-name"></span
                  >{{ t("company-name") }}</RouterLink
                >
              </div>

              <div
                @click="toggleMobileNav"
                class="mobile-nav-menu-btn"
                :class="{ 'mobile-nav-open': mobileNav }"
              >
                <div class="menu-btn-burger"></div>
              </div>
              <transition name="mobile-nav" mode="out-in">
                <div v-show="mobileNav" class="navigation mobile">
                  <div class="mobile-nav-top-spacer"></div>
                  <RouterLink
                    @click="pageIsOpenMobile"
                    class="nav-btn"
                    :to="{ name: 'about' }"
                    ><span class="mobile-icon mobile-about"></span
                    >{{ t("about-nav-btn") }}</RouterLink
                  >
                  <RouterLink
                    @click="pageIsOpenMobile"
                    class="nav-btn"
                    :to="{ name: 'instructor' }"
                    ><span class="mobile-icon mobile-instructor"></span
                    >{{ t("instructor-nav-btn") }}</RouterLink
                  >
                  <RouterLink
                    @click="pageIsOpenMobileHomeNav"
                    class="nav-btn home-btn-mobile"
                    :to="{ name: 'home' }"
                    ><span class="mobile-icon mobile-home"></span
                    >{{ t("home-nav-btn") }}</RouterLink
                  >
                  <RouterLink
                    @click="pageIsOpenMobile"
                    class="nav-btn"
                    :to="{ name: 'classes' }"
                    ><span class="mobile-icon mobile-classes"></span
                    >{{ t("classes-nav-btn") }}</RouterLink
                  >
                  <RouterLink
                    @click="pageIsOpenMobile"
                    class="nav-btn last"
                    :to="{ name: 'contact' }"
                    ><span class="mobile-icon mobile-contact"></span
                    >{{ t("contact-nav-btn") }}</RouterLink
                  >
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.5s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
}

.mobile-nav-enter-from.navigation-wrapper,
.mobile-nav-leave-to.navigation-wrapper {
  opacity: 0;
}

.mobile-homepage-nav-enter-active,
.mobile-homepage-nav-leave-active {
  transition: opacity 0.5s ease;
}

.mobile-homepage-nav-enter-from,
.mobile-homepage-nav-leave-to {
  opacity: 0;
}
</style>
