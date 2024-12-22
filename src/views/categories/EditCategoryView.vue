<template>
  <div>
    <h1>Editar Categoria</h1>
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
        <div v-if="errors.nombre" class="invalid-feedback">
          {{ errors.name }}
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "EditCategoryView",
  data() {
    return {
      errors: {},
    };
  },
  methods: {
    ...mapActions(["increment"]),
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = "El nombre es obligatorio.";
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        this.save();
        this.form = {
          name: "",
        };
      }
    },
    save() {
      const vm = this;
      this.axios
        .patch(this.baseUrl + `/categories/${this.item.id}`, this.form)
        .then(function (response) {
          if (response.status == "200") {
            vm.$emit("on-update", response.data);
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
    form() {
      return Object.assign({}, this.item);
    },
  },
  props: ["item"],
};
</script>

<style scoped></style>
