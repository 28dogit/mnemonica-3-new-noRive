export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    if (to.path === "/") {
      console.log("Middleware verso la home e visibility auto");
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      console.log("Middleware verso altre pagine e visibility hidden");
    }
  }
});

//dichiarato globlamente in nuxt.config
