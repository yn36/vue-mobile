<template>
  <div  :class="['vouter-view',menuTheme]">
    <router-view/>
  </div>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
export default {
  name: 'BlankLayout',
  mixins: [mixin, mixinDevice],
  data () {
    return {
      windowHeight:null
    }
  },
  mounted () {
    this.windowHeight=window.document.body.clientHeight+'px';
  }
}
</script>
