<template>
  <div id="app">
    <header class="header">
      <nav class="header-nav">
        <router-link class="link" to="/fraction-calculator">Fraction calculator</router-link>
        <router-link class="link" to="/comments">Comments</router-link>
      </nav>
    </header>

    <section class="main-wrapper">
      <router-view />
    </section>
  </div>
</template>

<style lang="scss">
  @import './common/styles/app.scss';
</style>
