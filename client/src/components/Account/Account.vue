<template>
  <div class="row q-pa-md bg-grey-9">

    <div class="col-2">

    </div>

    <div class="col-3">
      <Login></Login>
    </div>

    <div class="col-1">

    </div>

    <div class="col-3">
      <Register></Register>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Account/Login";
import Register from "@/components/Account/Register";
export default {
  name: "Account",
  components: {Register, Login}
}
</script>

<style scoped>

</style>