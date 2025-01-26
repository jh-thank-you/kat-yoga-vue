<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

onMounted(() => {
  const favicon = document.getElementById("favicon");
  // for final production remove "/dev/katyoga" from the href
  favicon.href = "/img/favicons/home/favicon.ico";
});
</script>

<template>
  <div id="main" :key="$route.name" class="home">
    <div id="detect-scroll" class="home-image-wrapper">
      <div
        class="home-page-image top_left"
        :alt="t('i-01a-alt-img-tag-home')"
      ></div>
      <div
        class="home-page-image top_right"
        :alt="t('i-02a-alt-img-tag-home')"
      ></div>
      <div
        class="home-page-image bottom_left"
        :alt="t('i-03a-alt-img-tag-home')"
      ></div>
      <div class="home-page-image bottom_right">
        <span class="home-page-name-wrapper kernme">
          <span class="home-page-name-top glow"
            ><span class="letter-k">K</span><span class="letter-a">A</span
            ><span class="letter-t">T</span><br /><span
              class="home-page-name-yoga glow"
              >{{ t("home-page-name") }}</span
            ></span
          ></span
        >
      </div>
    </div>
  </div>
</template>

<style>
/* custom styles - page specific CSS */
</style>
