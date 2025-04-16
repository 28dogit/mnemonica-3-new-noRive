<template>
  <h2><slot>Form name</slot></h2>
  <div>
    <UForm ref="form" :schema="formSchema" :state="state" class="space-y-4" @submit="formSubmition">
      <UFormGroup name="email" label="Email" required>
        <UInput v-model="state.email" type="email" />
      </UFormGroup>

      <UFormGroup name="select" label="Your Interest" required>
        <USelect v-model="state.select" placeholder="Select..." :options="options" />
      </UFormGroup>

      <UFormGroup name="firstName" label="First Name" required>
        <UInput v-model="state.firstName" type="text" />
      </UFormGroup>

      <UFormGroup name="lastName" label="Last Name" required>
        <UInput v-model="state.lastName" type="text" />
      </UFormGroup>

      <UFormGroup name="checkbox" label="Privacy Policy" required>
        <UCheckbox
          v-model="state.checkbox"
          label="I have read, understood, and accepted Mnemonica data treatment rules."
        />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>

      <UButton variant="outline" class="ml-2" @click="clearForm()"> Clear </UButton>
    </UForm>
    <div v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { z } from "zod";
const form = ref(null);
const successMessage = ref("");

const options = [
  { label: "Demo", value: "demo" },
  { label: "Trial", value: "trial" },
  { label: "Quote", value: "quote" },
  { label: "More Info", value: "info" },
  { label: "Phone Call", value: "call" },
  { label: "Other", value: "other" },
];
const state = reactive({
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  select: undefined,
  checkbox: undefined,
});
const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  select: z.enum(["demo", "trial", "quote", "info", "call", "other"]),
  checkbox: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});
function clearForm() {
  state.email = undefined;
  state.firstName = undefined;
  state.lastName = undefined;
  state.select = undefined;
  state.checkbox = undefined;
}

function formSubmition(event) {
  console.log(event);
  successMessage.value = "Thank you, the form has been sent successfully!";
  setTimeout(() => {
    clearForm();
    successMessage.value = "";
  }, 2000);
}
</script>

<style lang="scss" scoped></style>
