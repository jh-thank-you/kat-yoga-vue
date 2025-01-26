<script setup>
import { ref, onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import navMain from "./components/Navigation.vue";
import { useI18n } from "vue-i18n";
import { scrollDetection } from "./assets/js/scrolldetection.js";
import { checkDOMzoomMe } from "./assets/js/checkDOMforScroll.js";

import { useSeoMeta } from "@unhead/vue";

const router = useRouter();

// default language Slovak - sk
// localStorage.setItem("selected_language", "sk");
// const isEnglish = ref(localStorage.setItem("is_english", false));
const isEnglish = ref(localStorage.getItem("selected_language") === "en");
const value = localStorage.getItem("selected_language");
const currentValue = localStorage.getItem(
  "selected_language",
  // stringify the value to use in the If statements
  // (so ti's not a just a boolean True/False)
  JSON.stringify(value)
);
console.log("currentValue", currentValue); //to check current value of object in console

var currentLanguage = currentValue;

const { t, locale } = useI18n();

const loadUseSeoMeta = () => {
  var currentRouteName = router.currentRoute.value.name;
  console.log("tag-title-" + currentRouteName);
  useSeoMeta({
    title: t("tag-title-" + currentRouteName),
    description: t("tag-description-" + currentRouteName),
    ogDescription: t("tag-og-description-" + currentRouteName),
    ogTitle: t("tag-og-title-" + currentRouteName),
    ogImage: t("tag-og-image-" + currentRouteName),
    twitterCard: "summary_large_image",
  });
};

const updateLanguage = () => {
  // update locale lanuage settings from local storage prop
  locale.value = currentLanguage;
  if (currentLanguage == "sk") {
    document.documentElement.lang = "sk-SK";
    loadUseSeoMeta();
  } else {
    document.documentElement.lang = "en-US";
    loadUseSeoMeta();
  }
};

const selectLanguage = () => {
  if (currentLanguage !== "en") {
    currentLanguage = "en";
    localStorage.setItem("selected_language", "en");
    localStorage.setItem("is_english", true);
    isEnglish.value = true;
    console.log("EN - const currentLanguage = " + currentLanguage);
    updateLanguage();
    return { currentLanguage };
  }
  currentLanguage = "sk";
  localStorage.setItem("selected_language", "sk");
  localStorage.setItem("is_english", false);
  isEnglish.value = false;
  console.log("SK - const currentLanguage = " + currentLanguage);
  updateLanguage();
  return { currentLanguage };
};

onMounted(() => {
  // check current lanuage settings in local storage prop
  updateLanguage();
  // check if DOM element is read for Zoom scrolling effecrs
  // checkDOMzoomMe();
});
</script>

<template>
  <div
    id="app-wrapper"
    class="app-wrapper"
    :class="{
      'home-no-scroll': $route.name == 'home',
    }"
  >
    <!-- Navigation -->
    <navMain key="nav-menu" />

    <router-view v-slot="{ Component, route }">
      <transition
        name="fade"
        @after-enter="checkDOMzoomMe"
        @leave="loadUseSeoMeta"
      >
        <!-- Content -->
        <component :is="Component" :key="$route.name"></component>
      </transition>
      <div class="legal-copy">
        <p>{{ t("legal-copy") }}</p>
      </div>
    </router-view>
  </div>

  <button @click="selectLanguage" class="language-select">
    <span class="language-icon-crop"
      ><span class="language-icon" :class="{ english: isEnglish }"></span></span
    >{{ t("language-selection") }}
  </button>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: 1.5s ease opacity;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
