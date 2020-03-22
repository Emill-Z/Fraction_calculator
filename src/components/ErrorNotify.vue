<template>
    <div class="error-message" :class="{ show: !error.isValid }">
      <p>
        {{error.message}}
      </p>
    </div>
</template>

<script>
    export default {
        name: 'ErrorNotify',

        props: {
            error: { isValid: true, message: null },
        },
    }
</script>

<style lang="scss" scoped>
.error-message {
    position: absolute;
    bottom: 10px;
    right: -410px;
    width: 400px;
    min-height: 77px;
    background-color: red;
    color: white;
    border-radius: 3px;
    padding: 10px 20px;
    transition: all 0.3s;

    &.show {
        right: 10px;
    }
}
</style>