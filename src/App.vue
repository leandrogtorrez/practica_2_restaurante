<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Restaurantes</router-link>
      </div>
      <div class="navbar-menu">
        <router-link to="/categorias" class="navbar-item">Categorias</router-link>
      </div>
    </div>
  </nav>
  <br>
  <router-view />
</template>

<script>

</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-end {
  display: flex;
  align-items: center;
}

.navbar-brand,
.navbar-menu {
  margin-left: 2rem;
}

.navbar-item {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: #666;
  }
}

/* Media queries para responsividad */
@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem 1rem;
  }
  .navbar-end {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar-brand,
  .navbar-menu {
    margin-left: 0;
    margin-bottom: 1rem;
  }
  .navbar-item {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.2rem 0.5rem;
  }
  .navbar-end {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar-brand,
  .navbar-menu {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
  .navbar-item {
    font-size: 0.8rem;
  }
}
</style>