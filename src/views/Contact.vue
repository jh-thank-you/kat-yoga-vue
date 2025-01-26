<script setup>
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { checkDOMzoomMe } from "../assets/js/checkDOMforScroll.js";
import { removeScrollListeners } from "../assets/js/scrolldetection.js";
const { t } = useI18n();

onMounted(() => {
  const favicon = document.getElementById("favicon");
  // for final production remove "/dev/katyoga" from the href
  favicon.href = "/img/favicons/contact/favicon.ico";

  // check if DOM element is read for Zoom scrolling effecrs
  checkDOMzoomMe();
});

onUnmounted(() => {
  removeScrollListeners();
});
</script>

<template>
  <div id="detect-scroll" :key="$route.name" class="contact">
    <div
      id="zoom-me"
      class="hero-image-fixed zoom"
      :alt="t('i-01a-alt-img-tag-contact')"
    >
      <h1 id="hero-title" class="hero-header-text-main">
        {{ t("h-01a-contact") }}
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
          {{ t("h-01a-contact") }}
        </h1>

        <div class="row">
          <div class="column-grid cg-01 map-directions">
            <p>
              <span class="bold">{{ t("p-01a-contact") }}</span>{{ t("p-01b-contact") }}
            </p>

            <p>
              <span class="bold">{{ t("p-02a-contact") }}</span>
              <a class="paragraph-link" href="“tel:0949-714-143”">0949-714-143</a>
            </p>

            <p>
              <span class="bold">{{ t("p-03a-contact") }}</span>
              <a class="paragraph-link" href="mailto:KatYogaStudio@gmail.com">KatYogaStudio@gmail.com</a>
            </p>
          </div>
          <img
            class="img-section map-directions"
            src="/img/img-kat-yoga-location-map.png"
            :alt="t('i-02a-alt-img-tag-contact')"
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
/* custom styles - page specific CSS */
</style>
