<template>
  <Button primary label="Réserver 60'" @click="handleClick" />
</template>
<script lang="ts" setup>
const calendly = useCalendly();
const handleClick = () => {
  calendly.initPopupWidget({
    url: "https://calendly.com/moonenergy/60-minutes-rdv",
  });
};
</script>
