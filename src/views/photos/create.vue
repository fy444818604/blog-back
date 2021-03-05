<template>
  <photos-detail :is-edit="false" />
</template>

<script>
import photosDetail from './components/photosDetail'

export default {
  name: 'CreatePhotos',
  components: { photosDetail }
}
</script>
