<script setup lang="ts"></script>

<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-lg justify-between">
      <div class="text-h5">Create new store</div>
      <q-btn
        color="accent"
        icon="chevron_left"
        :to="{ name: 'StoreListPage' }"
        label="Go Back"
      ></q-btn>
    </div>
    <div class="row q-mb-lg">
      <div class="col-12">
        <q-toolbar class="bg-accent text-white">
          <q-toolbar-title>1. Shop Information</q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-lg" style="border: 1px solid #d2d2d2">
          <p>In this section, enter the Shop information you want create.</p>
          <div class="row q-col-gutter-lg q-mb-lg">
            <div class="col-12 col-md-6">
              <q-input color="accent" label="Title" class="q-my-sm" filled />
              <q-input color="accent" label="Category" class="q-my-sm" filled />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                color="accent"
                type="textarea"
                label="Description"
                filled
              />
            </div>
          </div>
          <div class="row justify-center">
            <q-btn color="accent">Build</q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-toolbar class="bg-accent text-white">
          <q-toolbar-title>2. Support Account Connection</q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-lg" style="border: 1px solid #d2d2d2">
          <p>
            You need to connect an account in order to receive all the events of
            your shop.
          </p>
          <p>To do this, please follow the steps below:</p>
          <ol>
            <li>
              <div>
                Search for
                <a
                  href="https://t.me/Platfoshopsbot"
                  target="_blank"
                  class="text-bold"
                  >@Platfoshopsbot</a
                >
                in Telegram or scan QR code with camera.
              </div>
              <div class="row justify-center full-width">
                <q-img
                  src="~assets/platfoshopbot_qrcode.svg"
                  style="max-width: 200px"
                ></q-img>
              </div>
            </li>
            <li>Click on the <span class="text-bold">"Start"</span> button</li>
            <li>
              Click on the
              <span class="text-bold">"Get confirmation code"</span> button
            </li>
            <li>
              Enter code in the bottom field & then click on the
              <span class="text-bold">"Connect"</span>.
            </li>
          </ol>
          <div class="row q-mb-lg">
            <div class="col-12">
              <q-input
                type="text"
                label="Confirmation code"
                color="accent"
                filled
              ></q-input>
            </div>
          </div>
          <div class="row justify-center">
            <q-btn color="accent" label="Connect"></q-btn>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <q-toolbar class="bg-accent text-white">
          <q-toolbar-title>3. Telegram Bot Connection</q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-lg" style="border: 1px solid #d2d2d2">
          <p>Connect your shop to your telegram bot.</p>
          <p>To do this, please follow the steps below:</p>
          <ol>
            <li>
              <div>
                Search for in Telegram or scan QR code with camera.
                <a
                  href="https://t.me/Botfather"
                  target="_blank"
                  class="text-bold"
                  >@Botfather</a
                >
                in Telegram or scan QR code with camera.
              </div>
              <div class="row justify-center full-width">
                <q-img
                  src="~assets/botfather_qrcode.svg"
                  style="max-width: 200px"
                ></q-img>
              </div>
            </li>
            <li>
              Click on the <span class="text-bold">start</span> button & send
              <span class="text-bold">/newbot</span> in chat.
            </li>
            <li>
              Do the steps of creating bot, includes choosing a
              <span class="text-bold">name</span> and
              <span class="text-bold">username</span>.
            </li>
            <li>
              Enter <span class="text-bold">token</span> of your bot that
              telegram sent & click on <span class="text-bold">"Connect"</span>.
            </li>
          </ol>
          <div class="row q-mb-lg">
            <div class="col-12">
              <q-input
                type="text"
                label="Bot Token"
                color="accent"
                filled
              ></q-input>
            </div>
          </div>
          <div class="row justify-center">
            <q-btn color="accent" label="Connect"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
