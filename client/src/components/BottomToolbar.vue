<template>
  <div class="row">
    <q-card class="bg-grey-9 q-pa-md row no-wrap items-center justify-around" style="width: 100%">
      <q-card-section>
        <q-icon name="subscriptions" size="100px">
        </q-icon>
      </q-card-section>
      <q-card-section>
        <h4>Video project documentation</h4>
      </q-card-section>

      <q-card-section class="items-center no-wrap justify-center">
        <q-item>
          <q-item-section>
            <q-icon name="account_balance" size="100px"/>
          </q-item-section>
          <q-item-section>

            <q-item>
              Instytut Podstaw Informatyki
            </q-item>
            <q-item>
              Polskiej Akademii Nauk
            </q-item>
            <q-item>
              Programowanie w języku javascript
            </q-item>

          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-section class="items-center no-wrap justify-center">
        <q-item>
          <q-item-section>
            <q-icon name="call" size="100px"/>
          </q-item-section>
          <q-item-section>

            <q-item>
              Wojciech Lozynski
            </q-item>
            <q-item>
              w.lozynski@icloud.com
            </q-item>

          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "BottomToolbar"
}
</script>

<style scoped>

</style>