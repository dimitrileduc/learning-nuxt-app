<template>
  <div class="w-full">
    <div class="w-full">
      <PageHeader>
        <div class="flex flex-col items-center justify-center text-center">
          <div v-if="title" class="text-3xl">{{ title }}</div>
          <div v-if="subtitle" class="mt-2">{{ subtitle }}</div>
          <div class="mt-10">
            <Button
              primary
              :label="ctaLabel"
              @click="smoothScrollTo('#credits', 1000, -80)"
            />
          </div>
        </div>
      </PageHeader>
      <PageSection
        id="credits"
        :title="sectionTitle"
        :subtitle="sectionSubtitle"
        class="border"
      >
        <div class="flex items-center justify-center">
          <div class="w-full sm:max-w-[644px] lg:max-w-[944px]">
            <SwiperBox :packs="packs" />
          </div>
        </div>
      </PageSection>
      <PageSection id="credits" :title="historiqueSectionTile" class="border">
        <div class="flex items-center justify-center">
          <div class="w-full sm:max-w-[644px] lg:max-w-[944px]">
            <div>historique</div>
          </div>
        </div>
      </PageSection>
    </div>
  </div>
</template>

<script setup>
const { smoothScrollTo } = useSmoothScroll();
const title = "Vous avez actuellement 1 crédit disponible";
const subtitle = "Valable jusqu’au 10/04/2024";
const ctaLabel = "Acheter des crédits";
const sectionTitle = "Recharge tes Moons maintenant";

const sectionSubtitle =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.";

const historiqueSectionTile = "Historique des derniers achats";

const packs = [
  { id: 1, creditsValue: 1, price: 9.9, label: "Lune" },
  { id: 2, creditsValue: 2, price: 17.9, label: "Univers" },
  { id: 3, creditsValue: 3, price: 25.9, label: "30" },
];
</script>
<style scoped></style>
