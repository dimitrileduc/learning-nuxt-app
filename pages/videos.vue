<template>
  <div class="w-full">
    <div class="w-full">
      <PageHeader>
        <div class="flex flex-col items-center justify-center text-center">
          <div v-if="title" class="text-3xl">{{ title }}</div>
          <div v-if="subtitle" class="mt-2">{{ subtitle }}</div>
          <div class="mt-10">
            <Button primary :label="ctaLabel" />
          </div>
        </div>
      </PageHeader>
      <PageSection :title="sectionTitle" :subtitle="sectionSubtitle">
        <UserVideos />
      </PageSection>
    </div>
  </div>
</template>

<script setup>
const title = "Consulter l’historique de vos tirages";
const sectionTitle = "Vos vidéos";
const ctaLabel = "Voir mes vidéos";
const sectionSubtitle =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.";
</script>

<style scoped></style>
