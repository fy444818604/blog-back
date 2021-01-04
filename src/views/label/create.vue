<template>
   <label-detail :is-edit="false" />
</template>

<script>
  import LabelDetail from './components/LabelDetail'
  
  export default {
    name: 'CreateLabel',
    components: { LabelDetail }
  }
</script>

