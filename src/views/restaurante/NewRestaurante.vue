<template>
  <div>
    <h1>Registrar Restaurante</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el nombre"
        />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label>Plataformas:</label>
        <div style="border: 1px solid #ccc; padding: 5px; border-radius: 5px">
          <div
            v-for="platform in plataforms"
            :key="platform"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 5px;
            "
          >
            <label :for="platform">{{ platform }}</label>
            <div>
              <input
                type="checkbox"
                :id="platform"
                :value="platform"
                v-model="form.platforms"
              />
            </div>
          </div>
        </div>
        <div v-if="errors.platforms" class="invalid-feedback">
          {{ errors.platforms }}
        </div>
      </div>

      <div class="form-group">
        <label for="category">Categoría:</label>
        <select
          id="category"
          v-model="form.category"
          :class="{ 'is-invalid': errors.category }"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <div v-if="errors.category" class="invalid-feedback">
          {{ errors.category }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { platformsArray } from "../../contants.js";

export default {
  name: "NewGame",
  data() {
    return {
      plataforms: platformsArray,
      form: {
        name: "",
        platforms: [],
        category: null,
      },
      errors: {},
      categories: [],
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = "El nombre es obligatorio.";
      }

      if (this.form.platforms.length === 0) {
        this.errors.platforms = "Debe seleccionar al menos una plataforma.";
      }

      if (!this.form.category) {
        this.errors.category = "La categoria es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    getCategories() {
      const vm = this;
      this.axios
        .get(this.baseUrl + "/categories")
        .then(function (response) {
          vm.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.form = {
          name: "",
          platforms: [],
          category: null,
        };
      }
    },
    save() {
      const vm = this;
      this.axios
        .post(this.baseUrl + "/games", {
          name: vm.form.name,
          platforms: vm.form.platforms,
          categoryId: vm.form.category,
        })
        .then(function (response) {
          if (response.status == "201") {
            vm.$emit("on-register", response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
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
