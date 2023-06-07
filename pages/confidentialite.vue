<template>
  <div class="w-full bg-white">
    <div class="w-full bg-white">
      <PageHeader>
        <div class="flex flex-col items-center justify-center text-center">
          <div v-if="title" class="text-3xl">{{ title }}</div>
          <div v-if="subtitle" class="mt-2">{{ subtitle }}</div>
        </div>
      </PageHeader>
      <div class="w-full h-auto bg-white px-20 py-16">
        <div v-if="copy" class="mt-2 text-[#104b51]">
          <div v-html="copy"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const title = "Cookies";
const subtitle = "Politique de confidentialité";
const copy = `<p><span style="font-size:16px"><strong>Politique de confidentialit&eacute; - Date
d&#39;entr&eacute;e en vigueur : Mai 2023</strong><br />
<br />
<strong>1. Introduction</strong><br />
Cette politique de confidentialit&eacute; explique comment nous collectons, utilisons,
divulguons et traitons les informations personnelles que nous collectons aupr&egrave;s des
utilisateurs de notre site internet, dans le cadre de la vente de vid&eacute;os et de la prise de
rendez-vous. Nous prenons la protection de vos donn&eacute;es personnelles tr&egrave;s au
s&eacute;rieux et nous nous engageons &agrave; respecter les lois et r&eacute;glementations
en mati&egrave;re de protection des donn&eacute;es, notamment le R&egrave;glement
g&eacute;n&eacute;ral sur la protection des donn&eacute;es (RGPD).<br />
<br />
<strong>2. Collecte de donn&eacute;es personnelles</strong><br />
Nous collectons les informations personnelles que vous nous fournissez lorsque vous vous
inscrivez sur notre site internet, lorsque vous effectuez une commande ou que vous vous
abonnez &agrave; notre newsletter. Ces informations peuvent inclure votre nom, votre adresse
email, votre adresse postale et votre num&eacute;ro de t&eacute;l&eacute;phone et toute autre
information que vous nous fournissez volontairement.<br />
Nous collectons &eacute;galement des informations automatiquement lorsque vous naviguez
sur notre site internet, telles que votre adresse IP, les pages que vous visitez, le type de
navigateur que vous utilisez, la date et l&#39;heure de votre visite, ainsi que d&#39;autres
informations techniques.<br />
<br />
<strong>3. Utilisation de vos donn&eacute;es personnelles</strong><br />
Nous utilisons les informations personnelles que nous collectons pour fournir les services que
vous avez demand&eacute;s, vous contacter en cas de besoin, vous envoyer des informations
sur nos produits et services, am&eacute;liorer notre site internet et personnaliser votre
exp&eacute;rience utilisateur.<br />
Nous ne partageons pas vos informations personnelles avec des tiers &agrave; des fins de
marketing direct. Nous pouvons cependant partager vos informations avec des prestataires de
services tiers qui nous aident &agrave; fournir les services que vous avez demand&eacute;s,
tels que des fournisseurs de paiement, des services d&#39;h&eacute;bergement ou des
fournisseurs de services de messagerie &eacute;lectronique.<br />
<br />
<strong>4. Conservation de vos donn&eacute;es personnelles</strong><br />
Nous ne conservons pas vos donn&eacute;es personnelles plus longtemps que
n&eacute;cessaire pour atteindre les finalit&eacute;s pour lesquelles elles ont
&eacute;t&eacute; collect&eacute;es, sauf si une p&eacute;riode de conservation plus longue
est n&eacute;cessaire pour se conformer &agrave; une obligation l&eacute;gale ou
r&eacute;glementaire.<br />
<br />
<strong>5. Vos droits en mati&egrave;re de protection des donn&eacute;es</strong><br />
Vous disposez de certains droits en mati&egrave;re de protection des donn&eacute;es,
notamment le droit d&#39;acc&egrave;s, de rectification, de suppression, de limitation, de
portabilit&eacute; et d&#39;opposition au traitement de vos donn&eacute;es personnelles. Pour

exercer ces droits, veuillez nous contacter via le formulaire de contact du site www.moon-
energy.net.<br />

<br />
<strong>6. Cookies</strong><br />
Nous utilisons des cookies pour am&eacute;liorer votre exp&eacute;rience utilisateur sur notre
site internet. Les cookies sont de petits fichiers texte stock&eacute;s sur votre ordinateur ou
votre appareil mobile lorsque vous visitez notre site internet. Nous utilisons des cookies de
session et des cookies persistants pour nous aider &agrave; identifier les pages les plus
populaires, &agrave; suivre les tendances de navigation et &agrave; collecter des informations
anonymes sur l&#39;utilisation de notre site internet. Vous pouvez d&eacute;sactiver les
cookies dans les param&egrave;tres de votre navigateur.<br />

<br />
<strong>7. S&eacute;curit&eacute; de vos donn&eacute;es personnelles</strong><br />
Nous prenons les mesures de s&eacute;curit&eacute; techniques et organisationnelles
appropri&eacute;es pour prot&eacute;ger vos donn&eacute;es</span></p>`;
</script>

<style scoped></style>
