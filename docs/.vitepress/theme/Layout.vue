<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import {inBrowser, useData} from 'vitepress'
import {watchEffect} from 'vue'

const {lang} = useData()
watchEffect(() => {
  if (inBrowser) {
    document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`;
    console.log(lang.value);
  }
})
</script>

<template>
  <DefaultTheme.Layout/>
</template>