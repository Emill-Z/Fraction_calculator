<template>
  <div class="fraction-block">
    <input
      type="number"
      :max="maxValue"
      class="input"
      v-model="localNumerator"
      :readonly="isReadonly"
    />
    <div class="divider"></div>
    <input
      type="number"
      :max="maxValue"
      class="input"
      v-model="localDenominator"
      :readonly="isReadonly"
    />
  </div>
</template>

<script>

export default {
  name: 'FractionBlock',

  props: {
    isReadonly: Boolean,
    numerator: Number,
    denominator: Number,
    maxValue: {
      type: Number, default: 9999
    }
  },

  computed: {
    localNumerator: {
      get() {
        return this.numerator;
      },
      set(newValue) {
        this.$emit('change', { value: newValue, type: 'numerator' })
      }
    },
    localDenominator: {
      get() {
        return this.denominator;
      },
      set(newValue) {
        this.$emit('change', { value: newValue, type: 'denominator' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fraction-block {
  display: flex;
  flex-direction: column;
}

.input {
  width: 75px;
  height: 65px;
  border: none;
  box-shadow: 0px 0px 4px 0px silver;
  border-radius: 3px;
  text-align: center;
  font-size: 1.5em;

  &[readonly] {
    outline: none;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.divider {
  width: 100%;
  height: 2px;
  background-color: black;
  margin: 10px 0;
}
</style>
