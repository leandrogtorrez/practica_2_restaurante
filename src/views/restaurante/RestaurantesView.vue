<template>
  <div style="margin: 0 50px">
    <div>
      <div class="row justify-content-start">
        <div class="col-md-2">
          <button class="btn btn-primary" @click="showModalNuevo = true">
            Agregar Restaurantes
          </button>
          <button @click="buscar()" class="btn btn-lith" style="float: right">
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

      <Modal v-model:modelValue="showModalEdit">
        <EditGame @on-update="onUpdate($event)" :item="itemToEdit" />
      </Modal>

      <Modal v-model:modelValue="showModalNuevo">
        <NewGame @on-register="onRegister($event)" />
      </Modal>
    </div>

    <div class="">
      <div style="margin: 20px 0">
        <h3>Filtros:</h3>
        <form @submit.prevent="filtrar()">
          <label for="platform"> Tipo de comida: </label>
          <select id="platform" v-model="filter.platformFilter">
            <option value="">Todos</option>
            <option
              v-for="plataform in platforms"
              :key="plataform"
              :value="plataform"
            >
              {{ plataform }}
            </option>
          </select>
          <button type="submit" class="btn btn-lith">Fitrar</button>
        </form>
      </div>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de Restaurante</th>
            <th scope="col">Tipo de comida</th>
            <th scope="col">Categoria</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in games" :key="index">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.platforms.join(", ") }}</td>
            <td>{{ item.category.name }}</td>
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
import { mapGetters } from "vuex";
import Modal from "../../components/Modal.vue";
import EditGame from "./EditRestaurante.vue";
import NewGame from "./NewRestaurante.vue";
import { platformsArray } from "../../contants.js";

export default {
  name: "JuegosView",
  data() {
    return {
      showModalNuevo: false,
      showModalEdit: false,
      itemToEdit: null,
      textToSearch: "",
      games: [],
      platforms: platformsArray,
      path: "",
      textToFilter: "",
      filter: {
        platformFilter: "",
      },
    };
  },
  components: {
    Modal,
    EditGame,
    NewGame,
  },
  methods: {
    getGames() {
      const vm = this;
      this.path =
        this.baseUrl +
        `/games?_expand=category${this.textToFilter}&q=${this.textToSearch}`;
      this.axios
        .get(
          this.baseUrl +
            `/games?_expand=category${this.textToFilter}&q=${this.textToSearch}`
        )
        .then(function (response) {
          vm.games = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    edit(item) {
      this.itemToEdit = Object.assign({}, item);
      this.showModalEdit = true;
    },
    buscar() {
      this.getGames();
    },
    filtrar() {
      this.textToFilter = "";
      if (
        this.filter.platformFilter != null &&
        this.filter.platformFilter != ""
      ) {
        this.textToFilter += "&platforms_like=" + this.filter.platformFilter;
      }
      this.getGames();
    },
    eliminar(id) {
      if (confirm("¿Esta Seguro de eliminar el registro?")) {
        const vm = this;
        this.axios
          .delete(this.baseUrl + "/games/" + id)
          .then(function (response) {
            vm.getGames();
            vm.$toast.show("Registro eliminado.", "danger");
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    onRegister(event) {
      this.getGames();
      this.showModalNuevo = false;
      this.$toast.show("Registro exitoso", "success");
    },
    onUpdate(event) {
      this.getGames();
      this.showModalEdit = false;
      this.itemToEdit = null;
      this.$toast.show("Edicion exitosa", "info");
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
    this.getGames();
  },
};
</script>
