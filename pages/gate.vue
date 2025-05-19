<template>
  <div class="page-wrapper">
    <h1>Mnemonica Gate</h1>
    <h2>More reliability, performance, and freedom for your transfers.</h2>
    <span class="divider h-[2rem] block"></span>
    <span class="block">
      <div class="col-3-wrapper">
        <div class="">
          <h2 class="title-enphasis">Unstoppable Data Flow</h2>
          <span class="divider h-[1rem] block"></span>
          <p>
            Mnemonica Gate is our stand-alone transfer manager for Mac, Windows, and
            Linux, taking care of your uploads and downloads. It safeguards transfers from
            hardware or network failures and enhances the user experience.
          </p>
        </div>
        <div class="">
          <h2 class="title-enphasis">Fearless File Handling</h2>
          <span class="divider h-[1rem] block"></span>
          <p>
            Upload files and folder trees with no size restrictions. The Gate works
            quietly, after starting—close your browser safely and let it handle all.
            Download terabytes with a single click. Worry-free data logistics, exactly as
            it should be.
          </p>
        </div>
        <div class="">
          <h2 class="title-enphasis">Fast and stable</h2>
          <span class="divider h-[1rem] block"></span>
          <p>
            Equipped with the revolutionary UDP-based
            <NuxtLink
              class="txt-link"
              to="https://en.wikipedia.org/wiki/QUIC"
              target="_blank"
              >QUIC protocol</NuxtLink
            >, Mnemonica Gate takes the most out of unstable ISP connections while other
            devices in the LAN keep working as usual. As our webapp, Mnemonica Gate
            supports <span class="txt-enphasis">HTTP/3</span> multiplexed connections.
          </p>
        </div>
      </div>
    </span>
    <span class="divider h-[2rem] block"></span>
    <div class="sys-icons flex gap-5">
      <NuxtImg width="24" src="assets/img/svg/Apple-W.svg" preload />
      <NuxtImg width="24" src="assets/img/svg/Windows-W.svg" preload />
      <NuxtImg width="24" src="assets/img/svg/Linux-W.svg" preload />
    </div>
    <!-- <ContentRenderer v-if="page" :value="page" /> -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: block;
  /* Add styles here */
}
</style>
