<template>
  <div class="calculator">
    <div class="wrapper">
      <div class="blocks" v-for="(item, index) in fractions" :key="index">
        <template v-if="!item.operator">
          <FractionBlock
            :numerator="item.numerator"
            :denominator="item.denominator"
            @change="onChangeFraction($event, index)"
          />
        </template>

        <template v-else-if="item.operator">
          <Operation :operation="item.operator" @change="onChangeOperator($event, index)"/>
        </template>
      </div>

      <div class="action"> = </div>
      <div>
        <FractionBlock
          :numerator="recalculate(result.numerator, result.denominator)"
          :denominator="recalculate(result.denominator, result.numerator)"
          :isReadonly="true"
        />
      </div>
    </div>
    <div v-if="fractions.length < maxFractionsLength" class="btn-wrapper">
      <button class="btn" type="button" @click="onAddFraction()">Add fraction</button>
    </div>

    <ErrorNotify :error="calcError" />
  </div>
</template>

<script>
import FractionBlock from '@/components/fraction-calculator/FractionBlock.vue'
import Operation from '@/components/fraction-calculator/Operation.vue'
import ErrorNotify from '@/components/ErrorNotify.vue'
import * as calculatorService from './services/fraction-calculator.service'
import { isNumeric } from './services/fractions-maths'

export default {
  name: 'FractionCalculator',

  data() {
    return {
      // Data structure
      fractions: [
        {
          numerator: null,
          denominator: null,
        },
        { operator: '+' },
        {
          numerator: null,
          denominator: null,
        }
      ],
      maxFractionsLength: 9,
      calcError: { isValid: true, message: null }
    }
  },

  computed: {
    result() {
      let isNotSet = false;

      this.fractions.forEach(item => {
        if (item.operator) { return; }
        if (!isNumeric(item.numerator) || !isNumeric(item.denominator)) { isNotSet = true; }
      });

      if (isNotSet) { return { numerator: null, denominator: null }; }

      this.validation();
      return calculatorService.calculate(JSON.parse(JSON.stringify(this.fractions)));
    },
  },

  methods: {
    onAddFraction() {
      this.fractions.push({ operator: this.fractions[this.fractions.length - 2].operator });
      this.fractions.push({ numerator: null, denominator: null });
    },

    onChangeFraction(event, index) {
      if (!event.value || isNaN(Number(event.value))) { return; }
      this.fractions[index][event.type] = Number(event.value);
    },

    onChangeOperator(value, index) {
      if (!value) { return; }
      this.fractions[index].operator = value;
    },

    recalculate(x, y) {
      if (x == 0 && y == 0 || !this.calcError.isValid) { return null; }
      if (isNumeric(x) && isNumeric(y) && x === y) { return 1; }
      return x;
    },

    validation() {
      const maxValue = 9999;
      const fractionsCopy = JSON.parse(JSON.stringify(this.fractions));

      const valuesNumerators = fractionsCopy.map(i => i && isNumeric(i.numerator) ? i.numerator : null);
      const valuesDenominators = fractionsCopy.map(i => i && isNumeric(i.denominator) ? i.denominator : null);

      if (valuesNumerators.some(i => i == 0) || valuesDenominators.some(i => i == 0)) {
        this.calcError.isValid = false;
        this.calcError.message = 'Please provide none zero numbers.';
        return;
      }

      if (valuesNumerators.some(i => i > maxValue) || valuesDenominators.some(i => i > maxValue)) {
        this.calcError.isValid = false;
        this.calcError.message = `Value must be less than or equal to ${maxValue}.`;
        return;
      }

      this.calcError.isValid = true;
      this.calcError.message = null;
    }
  },

  components: { FractionBlock, Operation, ErrorNotify }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blocks {
    display: flex;
    align-items: center;
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    font-size: 2em;
  }

  .btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
