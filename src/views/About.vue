<script setup>
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { checkDOMzoomMe } from "../assets/js/checkDOMforScroll.js";
import { removeScrollListeners } from "../assets/js/scrolldetection.js";
const { t } = useI18n();

onMounted(() => {
  const favicon = document.getElementById("favicon");
  // for final production remove "/dev/katyoga" from the href
  favicon.href = "/img/favicons/about/favicon.ico";

  // check if DOM element is read for Zoom scrolling effecrs
  checkDOMzoomMe();
});

onUnmounted(() => {
  removeScrollListeners();
});
</script>

<template>
  <div id="detect-scroll" :key="$route.name" class="about">
    <div
      id="zoom-me"
      class="hero-image-fixed zoom"
      :alt="t('i-01a-alt-img-tag-about')"
    >
      <h1 id="hero-title" class="hero-header-text-main">
        {{ t("h-01a-about") }}
      </h1>
    </div>
    <div id="main" class="main-content-wrapper">
      <div
        id="main-content-headline-bkg"
        class="main-content-headline-bkg"
      ></div>
      <!-- START main-content-wrapper -->
      <div class="main-content">
        <!-- START main-content -->
        <div class="scroll-area-wrapper-fix"></div>

        <h1 id="hero-title-sub" class="hero-header-text">
          {{ t("h-01a-about") }}
        </h1>

        <div class="row">
          <img
            class="img-section"
            src="/img/img-katia-in-tatra-mountain.png"
            :alt="t('i-02a-alt-img-tag-about')"
          />

          <div class="column-grid cg-01">
            <p>{{ t("p-01a-about") }}</p>

            <p>{{ t("p-02a-about") }}</p>

            <p>{{ t("p-03a-about") }}</p>

            <p>{{ t("p-04a-about") }}</p>
          </div>
        </div>

        <div class="row">
          <div class="column-grid cg-02">
            <p>
              <span class="bold">{{ t("p-05a-about-bold") }}</span
              >{{ t("p-05a-about") }}
            </p>

            <p>
              <span class="bold">{{ t("p-06a-about-bold") }}</span
              >{{ t("p-06a-about") }}
            </p>

            <p>
              <span class="bold">{{ t("p-07a-about-bold") }}</span
              >{{ t("p-07a-about") }}
            </p>

            <p>{{ t("p-08a-about") }}</p>

            <p>{{ t("p-09a-about") }}</p>
          </div>
          <img
            class="img-section"
            src="/img/img-kat-yoga-classroom.png"
            :alt="t('i-03a-alt-img-tag-about')"
          />
        </div>
        <div id="main-content-wrapper-bkg-img-pattern"></div>
      </div>
      <!-- END main-content -->
    </div>
    <!-- END main-content-wrapper -->
  </div>
</template>

<style>
/* Custom CSS */
</style>
