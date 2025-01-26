<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { checkDOMzoomMe } from "../assets/js/checkDOMforScroll.js";
import { removeScrollListeners } from "../assets/js/scrolldetection.js";
import Modal from "../components/Modal.vue";

const { t } = useI18n();
const showModal = ref(false);
var imgSource = "";
var altImgTxt = "";

onMounted(() => {
  const favicon = document.getElementById("favicon");
  // for final production remove "/dev/katyoga" from the href
  favicon.href = "/img/favicons/instructor/favicon.ico";

  // check if DOM element is read for Zoom scrolling effecrs
  checkDOMzoomMe();
});

onUnmounted(() => {
  removeScrollListeners();
});
</script>

<template>
  <div id="detect-scroll" :key="$route.name" class="instructor">
    <div
      id="zoom-me"
      class="hero-image-fixed zoom"
      :alt="t('i-01a-alt-img-tag-instructor')"
    >
      <h1 id="hero-title" class="hero-header-text-main">
        {{ t("h-01a-instructor") }}
      </h1>
    </div>

    <div id="main" class="main-content-wrapper">
      <div
        id="main-content-headline-bkg"
        class="main-content-headline-bkg"
      ></div>
      <!-- START main-content-wrapper -->
      <div class="main-content">
        <Teleport to="body">
          <!-- use the modal component, pass in the prop -->
          <modal :show="showModal" @close="showModal = false">
            <template #header>
              <img class="img-modal" :src="imgSource" :alt="altImgTxt" />
            </template>
          </modal>
        </Teleport>

        <!-- START main-content -->
        <div class="scroll-area-wrapper-fix"></div>

        <h1 id="hero-title-sub" class="hero-header-text">
          {{ t("h-01a-instructor") }}
        </h1>

        <div class="row">
          <img
            class="img-section"
            src="/img/img-katia-yoga-instructor.png"
            :alt="t('i-02a-alt-img-tag-instructor')"
          />

          <div class="column-grid cg-01">
            <p>{{ t("p-01a-instructor") }}</p>

            <p>{{ t("p-02a-instructor") }}</p>

            <p>{{ t("p-03a-instructor") }}</p>
          </div>
        </div>

        <div class="row">
          <img class="img-section mobile-hide-me" src="" alt="" />

          <div class="column-grid cg-02 image-block">
            <div class="img-section margin-rt">
              <img
                @click="
                  (showModal = true),
                    (imgSource =
                      '/img/img-certificate-peaceful-babes-kids-yoga-teacher.png'),
                    (altImgTxt = t('i-03a-alt-img-tag-instructor'))
                "
                class="alt-size-hrz zoom-img"
                src="/img/img-certificate-peaceful-babes-kids-yoga-teacher.png"
                :alt="t('i-03a-alt-img-tag-instructor')"
              />

              <button
                @click="
                  (showModal = true),
                    (imgSource =
                      '/img/img-certificate-peaceful-babes-kids-yoga-teacher.png'),
                    (altImgTxt = t('i-03a-alt-img-tag-instructor'))
                "
                class="zoom-btn-cert"
              >
                <div class="zoom-btn-burger"></div>
              </button>

              <span class="img-info">{{ t("s-04a-instructor") }}</span>
              <span class="img-info">{{ t("s-04b-instructor") }}</span>
            </div>

            <div class="img-section">
              <img
                @click="
                  (showModal = true),
                    (imgSource = '/img/img-certificate-raj-yoga-rishikesh.png'),
                    (altImgTxt = t('i-04a-alt-img-tag-instructor'))
                "
                class="alt-size-hrz zoom-img"
                src="/img/img-certificate-raj-yoga-rishikesh.png"
                :alt="t('i-04a-alt-img-tag-instructor')"
              />

              <button
                @click="
                  (showModal = true),
                    (imgSource = '/img/img-certificate-raj-yoga-rishikesh.png'),
                    (altImgTxt = t('i-04a-alt-img-tag-instructor'))
                "
                class="zoom-btn-cert"
              >
                <div class="zoom-btn-burger"></div>
              </button>

              <span class="img-info">{{ t("s-04a-instructor") }}</span>
              <span class="img-info">{{ t("s-04c-instructor") }}</span>
            </div>

            <div class="img-section margin-rt">
              <img
                @click="
                  (showModal = true),
                    (imgSource =
                      '/img/img-certificate-slovak-yoga-association.png'),
                    (altImgTxt = t('i-05a-alt-img-tag-instructor'))
                "
                class="alt-size-hrz zoom-img"
                src="/img/img-certificate-slovak-yoga-association.png"
                :alt="t('i-05a-alt-img-tag-instructor')"
              />

              <button
                @click="
                  (showModal = true),
                    (imgSource =
                      '/img/img-certificate-slovak-yoga-association.png'),
                    (altImgTxt = t('i-05a-alt-img-tag-instructor'))
                "
                class="zoom-btn-cert"
              >
                <div class="zoom-btn-burger"></div>
              </button>

              <span class="img-info">{{ t("s-04a-instructor") }}</span>
              <span class="img-info">{{ t("s-04d-instructor") }}</span>
            </div>

            <div class="img-section">
              <img
                @click="
                  (showModal = true),
                    (imgSource =
                      '/img/img-certificate-yoga-teacher-500-hour-cert.png'),
                    (altImgTxt = t('i-06a-alt-img-tag-instructor'))
                "
                class="alt-size-hrz zoom-img"
                src="/img/img-certificate-yoga-teacher-500-hour-cert.png"
                :alt="t('i-06a-alt-img-tag-instructor')"
              />

              <button
                @click="
                  (showModal = true),
                    (imgSource =
                      '/img/img-certificate-yoga-teacher-500-hour-cert.png'),
                    (altImgTxt = t('i-06a-alt-img-tag-instructor'))
                "
                class="zoom-btn-cert"
              >
                <div class="zoom-btn-burger"></div>
              </button>

              <span class="img-info">{{ t("s-04a-instructor") }}</span>
              <span class="img-info">{{ t("s-04e-instructor") }}</span>
            </div>
          </div>
        </div>
        <div id="main-content-wrapper-bkg-img-pattern"></div>
      </div>
      <!-- END main-content -->
      <!-- END main-content-wrapper -->
    </div>
  </div>
</template>

<style>
/* custom styles - page specific CSS */
</style>
