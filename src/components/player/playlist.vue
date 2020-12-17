<template>
	<div class="playlist overflow-auto sm:grid sm:grid-cols-2 sm:gap-6 py-4 px-4 sm:px-6 border-t bg-white">
		<div class="order-1 sm:sticky top-0 mb-6 sm:mb-0 px-4 pt-4 pb-6 self-start bg-gold bg-opacity-25">
			<CoverImage class="float-left mr-3" :width="100" :height="100" :src="album.cover" />

			<h2 class="mb-1 text-lg">{{ album.title }}</h2>
			<span class="text-sm">{{ album.description }}</span>
		</div>

		<ul>
			<li v-for="track in tracks" :key="track.id">
				<button
					@click="$emit('track-click', track)"
					:class="[
						'flex justify-between w-full p-2 hover:bg-gold hover:bg-opacity-25 cursor-pointer',
						{'bg-gold bg-opacity-25': track.id === currentTrack?.id}
					]">
					<span class="truncate">{{ track.title }}</span>
					<span class="ml-3 italic opacity-50">{{ track.duration }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import CoverImage from '/@/components/CoverImage.vue'

export default {
	components: {CoverImage},
	props: {
		album: Object,
		tracks: Array,
		currentTrack: Object,
	}
}
</script>

<style scoped>
.playlist {
	max-height: 50vh;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 128px;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 6px 2px;

	@screen sm {
		bottom: 86px;
	}
}
</style>
