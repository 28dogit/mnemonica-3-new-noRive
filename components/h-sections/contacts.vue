<template>
  <div class="section-contacts">
    <h1>Contacts</h1>
    <div class="content">
      <UForm
        ref="form"
        :schema="formSchema"
        :state="state"
        class="space-y-4"
        @submit="formSubmition"
      >
        <UFormGroup name="email" label="Email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>

        <UFormGroup name="select" label="Your Interest">
          <USelect v-model="state.select" placeholder="Select..." :options="options" />
        </UFormGroup>

        <UFormGroup name="firstName" label="First Name">
          <UInput v-model="state.firstName" type="text" />
        </UFormGroup>

        <UFormGroup name="lastName" label="Last Name">
          <UInput v-model="state.lastName" type="text" />
        </UFormGroup>

        <UFormGroup name="checkbox" label="Privacy Policy">
          <UCheckbox
            v-model="state.checkbox"
            label="I have read, understood, and accepted Mnemonica data treatment rules."
          />
        </UFormGroup>

        <UButton type="submit"> Submit </UButton>

        <UButton variant="outline" class="ml-2" @click="form.value?.clear()">
          Clear
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { z } from "zod";
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

function formSubmition(event) {
  console.log(event);
}
</script>

<style lang="scss" scoped></style>
