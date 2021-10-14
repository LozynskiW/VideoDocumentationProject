<template>
  <div class="row q-pa-md bg-light-blue-8">

    <div class="col-3">
      <Login></Login>
    </div>

    <div class="col-6">

    </div>

    <div class="col-3">
      <Register></Register>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Register from "@/components/Register";
export default {
  name: "Account",
  components: {Register, Login}
}
</script>

<style scoped>

</style>