<template>
  <div>
    <h1>Editar Restaurante</h1>
    <form @submit.prevent="submitForm" v-if="form">
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
        <label>Tipo de comidas:</label>
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

      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { platformsArray } from "../../contants.js";

export default {
  name: "EditGameView",
  props: ["item"],
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
  computed: {
    ...mapGetters(["getBaseUrl"]),
    baseUrl() {
      return this.getBaseUrl;
    },
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
        this.errors.category = "La categoría es obligatoria.";
      }

      return Object.keys(this.errors).length === 0;
    },
    getCategories() {
      const vm = this;
      axios
        .get(this.baseUrl + "/categories")
        .then(function (response) {
          vm.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    initializeForm() {
      this.form = {
        name: this.item.name || "",
        platforms: this.item.platforms || [],
        category: this.item.categoryId || null,
      };
    },
    submitForm() {
      if (this.validateForm()) {
        this.save();
      }
    },
    save() {
      const vm = this;
      axios
        .patch(this.baseUrl + "/games/" + this.item.id, {
          name: vm.form.name,
          platforms: vm.form.platforms,
          categoryId: vm.form.category,
        })
        .then(function (response) {
          if (response.status == "200") {
            vm.$emit("on-update", response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getCategories();
    this.initializeForm();
  },
  watch: {
    item: {
      handler() {
        this.initializeForm();
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
