<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

onMounted(() => {
  const favicon = document.getElementById("favicon");
  // for final production remove "/dev/katyoga" from the href
  favicon.href = "/img/favicons/error/favicon.ico";
});
</script>

<template>
  <div id="main" :key="$route.name" class="error">
    <div id="detect-scroll" class="home-image-wrapper">
      <div
        class="home-page-image top_left error"
        :alt="t('i-01a-alt-img-tag-error')"
      ></div>
      <div
        class="home-page-image top_right error"
        :alt="t('i-02a-alt-img-tag-error')"
      ></div>
      <div
        class="home-page-image bottom_left error"
        :alt="t('i-03a-alt-img-tag-error')"
      ></div>
      <div class="home-page-image bottom_right error">
        <span class="home-page-name-wrapper kernme">
          <span class="home-page-name-top glow"
            >404<br />
            <p class="home-page-name-yoga glow">{{ t("p-01a-error") }}</p>
            <p class="home-page-name-yoga glow">{{ t("p-01b-error") }}</p></span
          ></span
        >
      </div>
    </div>
  </div>
</template>

<style>
/* custom styles - page specific CSS */
</style>
