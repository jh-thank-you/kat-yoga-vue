<script setup>
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { checkDOMzoomMe } from "../assets/js/checkDOMforScroll.js";
import { removeScrollListeners } from "../assets/js/scrolldetection.js";
const { t } = useI18n();

onMounted(() => {
  const favicon = document.getElementById("favicon");
  // for final production remove "/dev/katyoga" from the href
  favicon.href = "/img/favicons/classes/favicon.ico";

  // check if DOM element is read for Zoom scrolling effecrs
  checkDOMzoomMe();
});

onUnmounted(() => {
  removeScrollListeners();
});
</script>

<template>
  <div id="detect-scroll" :key="$route.name" class="classes">
    <div
      id="zoom-me"
      class="hero-image-fixed zoom"
      :alt="t('i-01a-alt-img-tag-classes')"
    >
      <h1 id="hero-title" class="hero-header-text-main">
        {{ t("h-01a-classes") }}
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
          {{ t("h-01a-classes") }}
        </h1>

        <div class="row">
          <img
            class="img-section"
            src="/img/img-studio-bench-mats-storage.png"
            :alt="t('i-02a-alt-img-tag-classes')"
          />
          <div class="column-grid cg-01 list-block">
            <p>{{ t("p-01a-classes") }}</p>
            <ul class="list">
              <li class="list-item">{{ t("l-01a-classes") }}</li>
              <li class="list-item">{{ t("l-01b-classes") }}</li>
              <li class="list-item">{{ t("l-01c-classes") }}</li>
              <li class="list-item">{{ t("l-01d-classes") }}</li>
            </ul>

            <h2 class="spacer-30">{{ t("h-02a-classes") }}</h2>
            <p class="spacer-15">
              <span class="bold">{{ t("p-02a-contact") }}</span>
              <a class="paragraph-link" href="“tel:0949-714-143”"
                >0949-714-143</a
              >
            </p>

            <p>
              <span class="bold">{{ t("p-03a-contact") }}</span>
              <a class="paragraph-link" href="mailto:KatYogaStudio@gmail.com"
                >KatYogaStudio@gmail.com</a
              >
            </p>
          </div>
        </div>

        <div class="row">
          <div class="column-grid cg-02 list-block">
            <h2>{{ t("h-07a-classes") }}</h2>
            <ul class="list price">
              <li class="list-item">{{ t("l-07a-classes") }}</li>
              <li class="list-item">{{ t("l-07b-classes") }}</li>
              <li class="list-item">{{ t("l-07c-classes") }}</li>
              <li class="list-item">{{ t("l-07d-classes") }}</li>
              <li class="list-item">{{ t("l-07e-classes") }}</li>
            </ul>
          </div>
          <img
            class="img-section"
            src="/img/img-kat-yoga-class.png"
            :alt="t('i-03a-alt-img-tag-classes')"
          />
        </div>

        <div class="row">
          <img
            class="img-section"
            src="/img/pdf-yoga-retreat.png"
            :alt="t('i-03a-alt-img-tag-classes')"
          />
          <div class="column-grid cg-03 list-block">
            <h2>{{ t("h-04a-event") }}</h2>
            <ul class="list price">
              <li class="list-item">{{ t("l-04a-event") }}</li>
              <li class="list-item">{{ t("l-04b-event") }}</li>
              <li class="list-item">{{ t("l-04c-event") }}</li>
              <li class="list-item">
                <a
                  class="flyer-link"
                  href="/img/pdf-yoga-retreat.pdf"
                  download="Yoga-Retreat-PDF"
                  >{{ t("l-04d-event") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div id="main-content-wrapper-bkg-img-pattern"></div>
      </div>
      <!-- END main-content -->
    </div>
    <!-- END main-content-wrapper -->
  </div>
</template>

<style>
/* custom styles - page specific CSS */
</style>
