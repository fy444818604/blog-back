<template>
   <label-detail :is-edit="true" />
</template>

<script>
  import LabelDetail from './components/LabelDetail'
  
  export default {
    name: 'EditLabel',
    components: { LabelDetail }
  }
</script>

