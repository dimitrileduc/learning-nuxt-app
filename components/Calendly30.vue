<template>
  <Button primary label="Réserver 30'" @click="handleClick" />
</template>
<script lang="ts" setup>
const calendly = useCalendly();
const handleClick = () => {
  calendly.initPopupWidget({
    url: "https://calendly.com/moonenergy/30min",
  });
};
</script>
