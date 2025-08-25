<template>
  <div class="page-wrapper">
    <h1>Security</h1>
    <p>Designing to protect valuable assets, security has been our number one priority from the first line of code</p>
    <span class="divider h-[2rem] block"></span>
    <span class="p-[1rem] block">
      <h2>Certifications</h2>
      <div class="certifications-wrapper">
        <div class="certification-card">
          <NuxtImg width="180" loading="lazy" src="assets/img/certifications/colhead-tpn-gold.png" alt="ANICA Associazione Nazionale Industrie Cinematografiche Audiovisive Digitali" preload />
          <h2>TPN Gold Shield</h2>
          <span class="divider h-[1rem] block"></span>
          <p>
            The TPN Gold Shield certification confirms to the global market our policies’ value and our seriousness about security, guaranteeing our customers they work safe in a protected
            environment.
          </p>
        </div>
        <div class="certification-card">
          <NuxtImg width="180" loading="lazy" src="assets/img/certifications/colhead-iso-27001.png" alt="Post-Super" preload />
          <h2>ISO/IEC 27001</h2>
          <span class="divider h-[1rem] block"></span>
          <p>ISO/IEC 27001 certification ensures that Mnemonica is implementing an optimal information security management system for risk control, cyber-resilience, and operational excellence.</p>
        </div>
        <div class="certification-card">
          <NuxtImg width="180" loading="lazy" src="assets/img/certifications/colhead-gdpr-tr.png" alt="APostLab" preload />
          <h2>GDPR Compliance</h2>
          <span class="divider h-[1rem] block"></span>
          <p>As an EU-based Company, Mnemonica obeys the General Data Protection Regulation (GDPR) that is the most advanced law guaranteeing the safe processing of the individual’s personal data.</p>
        </div>
      </div>
    </span>
    <p>Active, Passive, Cloud Security</p>
    <span class="divider h-[2rem] block"></span>
    <p>MFA, Pwdless login, Integrations</p>
  </div>

  <!-- <MneParallaxWrapper :speed="100">
    <BtnMaster @click="isModalOpen = true">open Modale security</BtnMaster>
  </MneParallaxWrapper> -->

  <div style="height: 1000px; width: 100%; background: #e0e0e000">
    <!-- Spazio per controllo scroll con modal aperto -->
  </div>
  <!-- <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" /> -->
</template>

<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "page-layout",
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

const isModalOpen = ref(false);
const modalId = "security"; // qui indico il nome del modale che devo aprire in content/modali50
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style lang="scss" scoped>
@use "@/assets/css/_breakpoints.scss" as bp;

.certifications-wrapper {
  display: flex;
  //flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  gap: 1em;
  // padding: 1em;
  @include bp.for-tablet-portrait-down {
    flex-wrap: wrap;
  }
}
</style>
