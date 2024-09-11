<template>
  <div class="card flex justify-center">
    <Toast />
    <Dialog
      :visible="visible"
      modal
      :style="{ width: '25rem' }"
      @update:visible="visible = $event"
    >
      <template #header>
        <div v-if="userid === null">
          <h3 class="font-semibold">Create User</h3>
        </div>
        <div v-else>
          <h3 class="font-semibold">Edit User</h3>
        </div>
      </template>
      <div class="flex flex-col gap-4 mb-4">
        <div class="flex flex-col">
          <label for="username" class="font-semibold mb-1">First Name</label>
          <InputText
            id="username"
            type="text"
            v-model="name"
            :class="{ 'border-red-500': errors.name }"
          />
          <span v-if="errors.name" class="text-red-500 text-sm mt-1"
            >First name field is required</span
          >
        </div>
        <div class="flex flex-col">
          <label for="lastname" class="font-semibold mb-1">Last Name</label>
          <InputText
            id="lastname"
            type="text"
            v-model="apellido"
            :class="{ 'border-red-500': errors.apellido }"
          />
          <span v-if="errors.apellido" class="text-red-500 text-sm mt-1"
            >Last name field is required</span
          >
        </div>
        <div class="flex flex-col">
          <label for="email" class="font-semibold mb-1">Email</label>
          <InputText
            id="email"
            type="email"
            v-model="correo"
            :class="{ 'border-red-500': errors.correo }"
          />
          <span v-if="errors.correo" class="text-red-500 text-sm mt-1"
            >Email field is required</span
          >
        </div>
        <div class="flex flex-col">
          <label for="phone" class="font-semibold mb-1">Phone</label>
          <InputNumber
            inputId="withoutgrouping"
            :useGrouping="false"
            fluid
            v-model="talefono"
            :class="{ 'border-red-500': errors.talefono }"
          />
          <span v-if="errors.talefono" class="text-red-500 text-sm mt-1"
            >Phone field is required</span
          >
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <div v-if="userid === null">
          <Button type="button" label="Save" @click="createuser"></Button>
        </div>
        <div v-else>
          <Button type="button" label="Update" @click="updateuser"></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import userService from "../services/client/user.service";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const visible = defineModel("visible");
const newUser = defineModel("newUser");
const name = ref("");
const apellido = ref("");
const correo = ref("");
const talefono = ref(0);

const errors = reactive({
  name: false,
  apellido: false,
  correo: false,
  talefono: false,
});

const props = defineProps({
  userid: {
    type: Number,
    default: null,
    required: false,
  },
});

const emit = defineEmits(["userUpdated"]);

const validateField = (field, type = "text") => {
  const value = eval(field).value;

  if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errors[field] = !emailRegex.test(value);
  } else if (type === "text") {
    errors[field] = !value.trim();
  } else if (type === "number") {
    errors[field] = !value;
  }
};

const validateForm = () => {
  validateField("name", "text");
  validateField("apellido", "text");
  validateField("correo", "email");
  validateField("talefono", "number");
  return !Object.values(errors).some((error) => error);
};

const createuser = async () => {
  if (!validateForm()) return;

  try {
    const response = await userService.create({
      name: name.value,
      apellidos: apellido.value,
      correoelectronico: correo.value,
      telefono: talefono.value,
    });
    newUser.value = response.data;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "User created successfully",
      life: 3000,
    });
    resetForm();
    visible.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to create user",
      life: 3000,
    });
  }
};

const getUser = async () => {
  if (!props.userid) return;
  try {
    const response = await userService.getResource(props.userid);
    const user = response.data;
    name.value = user.name;
    apellido.value = user.apellidos;
    correo.value = user.correoelectronico;
    talefono.value = user.telefono;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch user",
      life: 3000,
    });
  }
};

const updateuser = async () => {
  if (!validateForm()) return;

  try {
    const response = await userService.update(props.userid, {
      name: name.value,
      apellidos: apellido.value,
      correoelectronico: correo.value,
      telefono: talefono.value,
    });
    emit("userUpdated", response.data);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "User updated successfully",
      life: 3000,
    });
    resetForm();
    visible.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update user",
      life: 3000,
    });
  }
};

const resetForm = () => {
  name.value = "";
  apellido.value = "";
  correo.value = "";
  talefono.value = "";
  Object.keys(errors).forEach((key) => (errors[key] = false));
};

watch(
  () => props.userid,
  (newValue) => {
    if (newValue) {
      getUser();
    }
  },
  { immediate: true }
);
</script>
