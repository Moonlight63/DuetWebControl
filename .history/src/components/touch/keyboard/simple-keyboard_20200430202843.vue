<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    },
    theme: String
  },
  data: () => ({
    keyboard: null
  }),
  mounted() {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      newLineOnEnter: true,
      theme: this.theme
    });
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.simple-keyboard {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* max-width: 850px; */
}

/*
  Theme: dark
*/
.theme--dark .simple-keyboard {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.theme--dark .simple-keyboard .hg-button {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #515151;
  border-color: black;
  border-radius: 0;
  color: white;
}

.theme--dark .simple-keyboard .hg-button:active {
  background: #1c4995;
  color: white;
}

.theme--dark #root .simple-keyboard + .simple-keyboard-preview {
  background: #1c4995;
}


/*
  Theme: light
*/
.theme--light .simple-keyboard {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.theme--light .simple-keyboard .hg-button {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #515151; */
  /* border-color: black; */
  border-radius: 0;
  /* color: white; */
}

.theme--light .simple-keyboard .hg-button:active {
  background: #1c4995;
  /* color: white; */
}

.theme--light #root .simple-keyboard + .simple-keyboard-preview {
  background: #1c4995;
}

</style>