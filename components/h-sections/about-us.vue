<template>
  <div class="section-about-us home">
    <h1>About Us</h1>
    <p>
      Quisque molestie maximus enim vel dignissim. Ut non urna quis lectus cursus
      pellentesque. Aliquam nec tortor nibh. In accumsan nunc non elit pulvinar vehicula.
      Fusce vehicula tellus ut diam consectetur, a posuere ex luctus. Morbi nec tincidunt
      nisi, vel vestibulum magna.
    </p>
    <div class="content">
      <div class="gallery">
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
        <img src="https://placehold.co/80x80" alt="Placeholder" />
      </div>
    </div>
    <h2>Partners</h2>
    <div class="partners-wrapper">
      <a href="https://www.anica.it/" target="_blank" rel="noopener">
        <NuxtImg
          width="180"
          loading="lazy"
          src="assets/img/partners/AnicaLogo_white_mono_negativo_orizzontale.png"
          alt="ANICA Associazione Nazionale Industrie Cinematografiche Audiovisive Digitali"
          preload
        />
      </a>
      <a href="https://post-super.com/" target="_blank" rel="noopener">
        <NuxtImg
          width="147"
          loading="lazy"
          src="assets/img/partners/postsuper-logo.png"
          alt="Post-Super"
          preload
        />
      </a>
      <a href="https://apostlab.com/" target="_blank" rel="noopener">
        <NuxtImg
          width="200"
          loading="lazy"
          src="assets/img/partners/apostlab-logo.png"
          alt="APostLab"
          preload
        />
      </a>
      <a
        href="https://www.italianpostproductionpartners.it/"
        target="_blank"
        rel="noopener"
      >
        <NuxtImg
          width="92"
          loading="lazy"
          src="assets/img/partners/IPPP-logo-rit.png"
          alt="Italian Post-Production Partners"
          preload
        />
      </a>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">
        <NuxtImg
          width="82"
          loading="lazy"
          src="assets/img/partners/tmdb-logo-full.png"
          alt="The Movie DataBase"
          preload
        />
      </a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content {
  padding: 1em 0 1em 0;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.partners-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1em;
  padding: 1em;
}
</style>
