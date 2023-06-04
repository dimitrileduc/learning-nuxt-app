<template>
  <div>
    <CookieControl>
      <template #bar>
        <div class="global-text text-xs">
          <p class="pb-2">
            Ce site web stocke des cookies sur votre ordinateur. Ces cookies
            permettent d'améliorer votre expérience de site web et de fournir
            des services plus personnalisés. Pour obtenir plus d'informations
            sur les cookies que nous utilisons, consultez notre politique de
            confidentialité.
          </p>
          <NuxtLink
            class="w-full h-full mt-4"
            :to="{ path: '/confidentialite' }"
            ><div class="w-full h-full pb-3 pt-1 underline">
              Lire notre politique de confidentialité
            </div></NuxtLink
          >
        </div>
      </template>
    </CookieControl>
    <!--
    <fieldset>
      <legend>Choose a language</legend>
      <div>
        <label for="input-en">English</label>
        <input id="input-en" v-model="locale" type="radio" value="en" />
      </div>
      <div>
        <label for="input-de">German</label>
        <input id="input-de" v-model="locale" type="radio" value="de" />
      </div>
    </fieldset>
    -->
  </div>
</template>

<script setup lang="ts">
const locale = ref<any>("fr");
</script>

<style>
.global-text {
  color: #104b51;

  font-family: Lato;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.cookieControl__BarContainer {
  background-color: white;
}
.cookieControl__Bar h3 {
  color: #104b51;
}
.cookieControl__Bar p {
  color: #104b51;
}

.cookieControl__Bar button {
  color: #104b51;
  text-decoration: underline;
}

.cookieControl button {
  border: 0;
  outline: 0;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 12px;
  backface-visibility: hidden;
}

.cookieControl button :hover {
  background-color: none !important;
}

.cookieControl__BarButtons button:nth-child(3) {
  display: none;
}
</style>
