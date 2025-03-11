<template>
  <div>
    <h2>Titolo pagina dataProva</h2>
    <!-- <div class="title">{{ testdata.meta.body.value[1][2][2][1].id }}</div>
    <div class="testo">{{ testdata.meta.body.value[0][0] }}</div> -->
    <!-- <pre>{{ testdata.meta.body.value[0][0] }}</pre> -->
    <!-- <pre class="test">{{ testdata.meta.body.value[1][0] }}</pre> -->
    <pre>{{ screentitle }}</pre>
    <pre>{{ testdata }}</pre>
  </div>
</template>

<script setup>
const { data: testdata } = await useAsyncData("testdata", () => {
  return queryCollection("contentData").first();
  //   .where("stem", "=", "testdata")
});
const { data: screentitle } = await useAsyncData(() =>
  queryCollection("contentData").where({
    body: {
      children: {
        $contains: { tag: "elemento-iniziale" },
      },
    },
  })
);
// const { data: testdataJ } = await useAsyncData(() =>
//   queryCollection("contentJData").first()
// );

// const elementoIniziale = data.body.children?.find(
//   (child) => child.tag === "elemento-iniziale"
// );
</script>

<style scoped></style>
