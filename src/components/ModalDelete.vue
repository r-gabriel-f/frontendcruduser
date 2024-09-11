<template>
  <div class="card flex justify-center">
    <Toast />
    <Dialog
      :visible="visibledelete"
      modal
      header="Delete User"
      :style="{ width: '25rem' }"
      @update:visible="visibledelete = $event"
    >
      <span
        >Are you sure you want to delete the user {{ userinfo.name }}
        {{ userinfo.apellidos }} ?
      </span>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visibledelete = false"
        ></Button>
        <Button
          type="button"
          label="Delete"
          severity="danger"
          @click="deleteusuario"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import userService from "../services/client/user.service";
import Toast from 'primevue/toast';

import { useToast } from "primevue/usetoast";
const toast = useToast();
const visibledelete = defineModel("visible");
const deleteuser = defineModel("deleteuser");

const props = defineProps({
  userinfo: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["userDeleted"]);
const deleteusuario = async () => {
  try {
    await userService.remove(props.userinfo.id);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: `User deleted successfully ${props.userinfo.name} ${props.userinfo.apellidos}`,
      life: 3000,
    })
    visibledelete.value = false;
    emit('userDeleted', props.userinfo.id);
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to delete user",
      life: 3000,
    })
  }
};
</script>
