<template>
  <photos-detail :is-edit="true" />
</template>

<script>
import photosDetail from './components/photosDetail'

export default {
  name: 'EditPhotos',
  components: { photosDetail }
}
</script>
