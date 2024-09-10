<template>
  <div class="card flex justify-center">
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
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Nombre</label>
        <InputText type="text" v-model="name" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Apellidos</label>
        <InputText type="text" v-model="apellido" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">
          Correo Electrónico
        </label>
        <InputText type="text" v-model="correo" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Teléfono</label>
        <InputText type="text" v-model="talefono" />
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
          <Button type="button" label="Save" @click="updateuser"></Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import userService from "../services/client/user.service";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const visible = defineModel("visible");
const newUser = defineModel("newUser");
const name = ref("");
const apellido = ref("");
const correo = ref("");
const talefono = ref("");

const props = defineProps({
  userid: {
    type: Number,
    default: null,
    required: false,
  },
});
const emit = defineEmits(["userUpdated"]);
const createuser = async () => {
  try {
    const response = await userService.create({
      name: name.value,
      apellidos: apellido.value,
      correoelectronico: correo.value,
      telefono: talefono.value,
    });
    newUser.value = response.data;
    name.value = "";
    apellido.value = "";
    correo.value = "";
    talefono.value = "";
    visible.value = false;
  } catch (error) {
    console.error("Error creating user:", error);
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
    console.error("Error fetching user:", error);
  }
};

const updateuser = async () => {
  try {
    const response = await userService.update(props.userid, {
      name: name.value,
      apellidos: apellido.value,
      correoelectronico: correo.value,
      telefono: talefono.value,
    });
    emit("userUpdated", response.data);
    name.value = "";
    apellido.value = "";
    correo.value = "";
    talefono.value = "";
    visible.value = false;
  } catch (error) {
    console.error("Error creating user:", error);
  }
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
