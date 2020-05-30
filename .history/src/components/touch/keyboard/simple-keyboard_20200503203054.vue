<template>
  <div :class="keyboardClass" ></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import english from "./layouts/english";

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
    theme: String,
    numericOnly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    keyboard: null,
    shift: false
  }),
  mounted() {

    let layoutName = this.numericOnly ? "numeric" : "default";

    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      newLineOnEnter: true,
      theme: this.theme,
      mergeDisplay: true,
      preventMouseDownDefault: true,
      display: {
        "{bksp}": "Backspace",
        "{enter}": "Enter",
        "{lock}": "Caps\nLock",
        "{shift}": "Shift",
        "{tab}": "Tab",
        "{delete}": "Delete"
      },
      layout: english,
      layoutName: layoutName
    });

    this.keyboard.setInput(this.input);

  },
  methods: {
    onChange(input) {
      //console.log(this.keyboard.getCaretPosition());
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}") this.handleShift();
      else if (button === "{lock}") this.handleCaps();
      else {
        this.shift = false;
      }
    },
    getCaretPosition() {
      return this.keyboard.getCaretPosition();
    },
    handleShift() {
      this.shift = !this.shift;
    },
    handleCaps() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      if(shiftToggle === "shift") {
        this.keyboard.addButtonTheme("{lock}", "locked");
      } else {
        this.keyboard.removeButtonTheme("{lock}", "locked");
      }
      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    },
  },
  watch: {
    input(input) {
      console.log("input Changed");
      console.log(input);
      this.keyboard.setInput(input);
    },
    shift: function() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      if(this.shift) {
        this.keyboard.addButtonTheme("{shift}", "locked");
      } else {
        this.keyboard.removeButtonTheme("{shift}", "locked");
      }
      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
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

.hg-layout-numeric {
  width: 30%;
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
  background: var(--v-primary-base);
  color: white;
}

.theme--dark .simple-keyboard .hg-button.locked {
  background: var(--v-primary-base);
  color: white;
}

.theme--dark #root .simple-keyboard + .simple-keyboard-preview {
  background: var(--v-primary-base);
}


/*
  Theme: light
*/
.theme--light .simple-keyboard {
  background-color: #F5F5F5;
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
  background: var(--v-primary-base);
  /* color: white; */
}

.theme--light .simple-keyboard .hg-button.locked {
  background: var(--v-primary-base);
  /* color: white; */
}

.theme--light #root .simple-keyboard + .simple-keyboard-preview {
  background: var(--v-primary-base);
}

</style>