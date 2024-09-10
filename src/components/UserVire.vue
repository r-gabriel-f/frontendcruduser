<template>
  <ModalCreateEditUser
    v-model:visible="visible"
    v-model:newUser="newUser"
    :userid="userid"
    @userUpdated="handleUserUpdated"
  />
  <ModalDelete
    v-model:visible="visibledelete"
    :userinfo="userinfo"
    @userDeleted="handleUserDeleted"
  />
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="datauser"
      tableStyle="min-width: 50rem"
      :globalFilterFields="[
        'name',
        'apellidos',
        'correoelectronico',
        'telefono',
      ]"
    >
      <template #header>
        <div class="flex justify-between gap-2">
          <Button label="Create User" icon="pi pi-plus" @click="visible = true" />
          <InputText
            v-model="filters['global'].value"
            placeholder="Search"
            class="w-full sm:w-auto"
          />
        </div>
      </template>
      <Column field="name" header="Name"></Column>
      <Column field="apellidos" header="Last Name"></Column>
      <Column field="correoelectronico" header="Email"></Column>
      <Column field="telefono" header="Phone"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editUser(slotProps.data.id)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            severity="danger"
            @click="deleteusuario(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import userService from "../services/client/user.service";
import ModalCreateEditUser from "./ModalCreateEditUser.vue";
import ModalDelete from "./ModalDelete.vue";
import { FilterMatchMode } from '@primevue/core/api';
const visible = ref(false);
const visibledelete = ref(false);
const newUser = ref([]);
const deleteuser = ref();
const datauser = ref([]);
const userinfo = ref();
const userid = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS  },
});
const deleteusuario = (data) => {
  visibledelete.value = true;
  userinfo.value = data;
};
const editUser = (id) => {
  visible.value = true;
  userid.value = id;
};
const handleUserDeleted = (deletedUserId) => {
  datauser.value = datauser.value.filter((user) => user.id !== deletedUserId);
};
const handleUserUpdated = (updatedUserId) => {
  const index = datauser.value.findIndex(
    (user) => user.id === updatedUserId.id
  );
  if (index) {
    datauser.value[index] = updatedUserId;
    console.log(datauser.value);
  }
};
onMounted(async () => {
  try {
    const response = await userService.getAll();
    datauser.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});
watch(newUser, (value) => {
  if (value) {
    datauser.value.push(value);
  }
});
watch(deleteuser, (value) => {
  if (value) {
    console.log(value);
  }
});
</script>
