<template>
  <div style="margin: 0 50px">
    <div>
      <div class="row justify-content-start">
        <div class="col-md-2">
          <button @click="buscar" class="btn btn-lith" style="float: right">
            Buscar
          </button>
          <input
            type="search"
            style="float: right"
            v-model="textToSearch"
            @search="buscar()"
          />
        </div>
      </div>

      <Modal v-model:modelValue="showModalNuevo">
        <NewCategoryView @on-register="onRegister" />
      </Modal>
      <Modal v-model:modelValue="showModalEdit">
        <EditCategoryView @on-update="onUpdate" :item="itemToEdit" />
      </Modal>

      <div class="row justify-content-start">
        <div class="col-md-2">
          <button class="btn btn-primary" @click="showModalNuevo = true">
            Agregar Categoría
          </button>
        </div>
      </div>

      <br />
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in categories" :key="index">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <button
                @click="edit(item)"
                class="btn btn-dark"
                style="margin-right: 15px"
              >
                Editar
              </button>
              <button @click="eliminar(item.id)" class="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
import Modal from "../../components/Modal.vue";
import NewCategoryView from "./NewCategoryView.vue";
import EditCategoryView from "./EditCategoryView.vue";

export default {
  name: "Categorias",
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: "",
      categories: [],
    };
  },
  components: {
    Modal,
    NewCategoryView,
    EditCategoryView,
  },
  methods: {
    getCategories() {
      const vm = this;
      axios
        .get(this.baseUrl + `/categories`)
        .then(function (response) {
          vm.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    buscar() {
      const vm = this;
      axios
        .get(this.baseUrl + `/categories?q=${this.textToSearch}`)
        .then(function (response) {
          vm.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    edit(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    eliminar(id) {
      if (confirm("¿Está seguro de eliminar el registro?")) {
        const vm = this;
        axios
          .delete(this.baseUrl + `/categories/${id}`)
          .then(function (response) {
            vm.getCategories();
            vm.showToast("Registro eliminado.", "danger");
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    onRegister(event) {
      this.getCategories();
      this.showModalNuevo = false;
      this.showToast("Registro exitoso", "success");
    },
    onUpdate(event) {
      this.getCategories();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.showToast("Edición exitosa", "info");
    },
    showToast(message, type) {
      this.$toast.show(message, type);
    },
  },
  computed: {
    ...mapGetters(["getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style scoped></style>
