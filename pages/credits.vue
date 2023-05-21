<template>
  <div class="w-full">
    <ClientOnly>
      <div class="w-full">
        <PageHeader v-if="user">
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
          v-if="user"
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
        <PageSection
          v-if="user"
          id="credits"
          :title="historiqueSectionTile"
          class=""
        >
          <div class="flex items-center justify-center">
            <div class="w-full sm:max-w-[644px] lg:max-w-[944px] pt-6">
              <CreditsTable />
            </div>
          </div>
        </PageSection>
      </div>

      <Checkout v-if="showPayment && user" @close="setShowPayment(false)" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const { credits, loading } = await useCredits();

import { useAuth } from "~/stores/useAuth";
const { user } = storeToRefs(useAuth());
import { usePayment } from "~~/stores/usePayment";
const { smoothScrollTo } = useSmoothScroll();
const { setShowPayment } = usePayment();
const { showPayment } = storeToRefs(usePayment());
const title = computed(() => {
  if (credits.value === 1) {
    return "Vous avez actuellement 1 crédit disponible";
  } else if (credits.value > 1) {
    return `Vous avez actuellement ${credits.value} crédits disponibles`;
  } else {
    return "Vous n'avez actuellement aucun crédit disponible";
  }
});
const subtitle = "Valable jusqu’au 10/04/2024";
const ctaLabel = "Acheter des crédits";
const sectionTitle = "Packs extensions guidances intuitives lunaires";

const sectionSubtitle =
  " Rechargez ici vos crédits afin d'en savoir plus sur les énergies du moment pour lever des blocages, éclairer des zones d’ombres et pour recevoir les messages qui vous permettent de vous positionner concrètement dans votre vie.";

const historiqueSectionTile = "Historique des derniers achats";

const packs = [
  { id: 1, creditsValue: 1, price: 11, type: "lune_pack", title: "Lune" },
  { id: 2, creditsValue: 2, price: 20, type: "univers", title: "Planète" },
  { id: 3, creditsValue: 3, price: 27, type: "galaxie", title: "Galaxie" },
];
</script>
<style scoped></style>
