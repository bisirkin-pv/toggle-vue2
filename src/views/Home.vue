<template>
  <div class="home">
    <TogglesCard />
  </div>
</template>

<script>
// @ is an alias to /src
import TogglesCard from "@/components/TogglesCard.vue";

export default {
  name: "Home",
  components: {
    TogglesCard,
  },
};
</script>
