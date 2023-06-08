<template>
  <div class="w-full">
    <div class="w-full">
      <PageHeader>
        <div class="flex flex-col items-center justify-center text-center">
          <div>
            <div v-if="user.profile">
              <nuxt-img
                alt="user-card"
                class="rounded-full w-[160px] h-[160px] border-2 border-blue-400"
                :src="profile"
              />
            </div>
            <div else>
              <nuxt-icon class="text-[160px]" name="avatar" filled />
            </div>
          </div>
          <div class="mt-4">
            <Button
              primary
              :label="ctaLabel"
              @click="smoothScrollTo('#form', 1000, -80)"
            />
          </div>
          <div v-if="name" class="text-3xl mt-8">{{ name }}</div>
        </div>
      </PageHeader>
      <PageSection id="form" :title="sectionTitle" class="border">
        <div class="flex items-center justify-center">
          <div class="w-full sm:max-w-[644px] lg:max-w-[944px]">
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              @invalid-submit="onInvalidSubmit"
            >
              <div class="form mt-8 sm:mt-4 lg:mt-8 w-full">
                <div class="flex flex-col items-center w-full gap-y-1">
                  <FormInput
                    name="username"
                    label="username"
                    placeholder="Nom d'utilisateur"
                    type="texte"
                    bgWhite
                  />
                  <FormInput
                    name="nom"
                    label="nom"
                    placeholder="nom"
                    type="texte"
                    bgWhite
                  />
                  <FormInput
                    name="prenom"
                    label="prenom"
                    placeholder="Prénom"
                    type="texte"
                    bgWhite
                  />
                  <FormInput
                    name="email"
                    label="email"
                    placeholder="Email"
                    type="email"
                    bgWhite
                  />

                  <FormInput
                    name="phone"
                    label="phone"
                    placeholder="Phone"
                    type="texte"
                    bgWhite
                  />
                </div>
              </div>
              <div class="button_container mt-8 sm:mt-4 lg:mt-8">
                <Button primary label="Enregistrer" />
                <div />
              </div>
            </Form>
          </div>
        </div>
      </PageSection>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import * as Yup from "yup";
const { smoothScrollTo } = useSmoothScroll();
import { storeToRefs } from "pinia";
import { useAuth } from "~/stores/useAuth";

const { refresh } = await useUsername();

const ctaLabel = "Modifier mon profil";
const sectionTitle = "Mettre à jour vos informations personnelles";
const { user } = storeToRefs(useAuth());

const name = computed(() => user.value?.user_metadata.full_name ?? "");
const profile = computed(() => user.value?.user_metadata.avatar_url);

const profilSchema = Yup.object().shape({
  username: Yup.string().required(),
});

function onSubmit(values) {
  profilSchema.validate(values).then((valid) => {
    if (valid) {
      console.log("valid", valid);

      const url = "/api/user/usernameUpdate";
      const { data, error, pending } = useFetch(url, {
        method: "POST",
        body: values.username,
      });
      if (error.value) {
        console.log("error", error.value);
      }
      if (data.value) {
        console.log("data user name", data.value);
        window.location.reload(true);
        // refresh();
        //window.location.href = "https://moon-energy.net/profile";
      }
    } else {
      console.log("Form is not valid.");
    }
  });
}

function onInvalidSubmit(values) {}
</script>
<style scoped></style>
