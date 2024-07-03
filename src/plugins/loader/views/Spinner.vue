<template>
    <v-overlay
      v-if="isLoading"
      z-index="10"
      color="#000000"
      opacity=".4"
    >
      <spinner :animation-duration="2500" :size="65" />
    </v-overlay>
  </template>
  
  <script>
  import { HalfCircleSpinner as spinner } from "epic-spinners";
  export default {
    name: "SpinnerPlugin",
    components: {
      spinner,
    },
    props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  };
  </script>
  
  <style scoped></style>
  