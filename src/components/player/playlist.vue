<template>
	<div class="playlist grid grid-cols-2 py-4 px-6 border-t bg-white">
		<div class="flex-1 p-4 bg-gold bg-opacity-25">
			<img class="float-left mr-3" src="https://via.placeholder.com/200" />
			<h2 class="mb-2 text-lg">{{ album.title }}</h2>
			<span class="mt-2 text-sm">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</span>
		</div>

		<ul class="flex-1">
			<li v-for="track in tracks" :key="track.id">
				<button
					@click="$emit('track-click', track)"
					:class="[
						'flex justify-between w-full p-2 ml-4 hover:bg-gold hover:bg-opacity-25 cursor-pointer',
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
export default {
	props: {
		album: Object,
		tracks: Array,
		currentTrack: Object,
	}
}
</script>

<style scoped>
.playlist {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 93px;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 6px 2px;
}
</style>
