<template>
	<div class="sm:leading-none">
		<button
			:class="['text-nobel', {'opacity-50 cursor-default': !prev}]"
			@click="prev && $emit('prev-click')">
			<svg class="w-6 fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320.012 320.012" style="enable-background:new 0 0 320.012 320.012;" xml:space="preserve">
				<path d="M32.006,0.012c8.832,0,16,7.168,16,16v116.64L280.166,2.06c4.896-2.784,11.008-2.752,15.904,0.128s7.936,8.128,7.936,13.824 v288c0,5.696-3.04,10.944-7.936,13.824c-2.464,1.44-5.28,2.176-8.064,2.176c-2.72,0-5.408-0.672-7.84-2.048L48.006,187.372v116.64 c0,8.832-7.168,16-16,16s-16-7.168-16-16v-288C16.006,7.18,23.174,0.012,32.006,0.012z"/>
			</svg>
		</button>

		<button class="ml-10 text-nobel" @click="$emit('play-toggle-click')">
			<svg v-if="isPlaying" class="w-6 fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" style="enable-background:new 0 0 320 320;" xml:space="preserve">
				<path d="M112,0H16C7.168,0,0,7.168,0,16v288c0,8.832,7.168,16,16,16h96c8.832,0,16-7.168,16-16V16C128,7.168,120.832,0,112,0z"/>
				<path d="M304,0h-96c-8.832,0-16,7.168-16,16v288c0,8.832,7.168,16,16,16h96c8.832,0,16-7.168,16-16V16C320,7.168,312.832,0,304,0z" />
			</svg>
			<svg v-else class="w-6 fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320.001 320.001" style="enable-background:new 0 0 320.001 320.001;" xml:space="preserve">
				<path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288 c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144 c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
			</svg>
		</button>

		<button
			:class="['ml-10 text-nobel', {'opacity-50 cursor-default': !next}]"
			@click="next && $emit('next-click')">
			<svg class="w-6 fill-current" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" style="enable-background:new 0 0 320 320;" xml:space="preserve">
				<path d="M288,0c-8.832,0-16,7.168-16,16v116.64L39.84,2.048c-4.896-2.752-11.008-2.72-15.904,0.128S16,10.304,16,16v288 c0,5.696,3.04,10.944,7.936,13.824C26.4,319.264,29.216,320,32,320c2.72,0,5.408-0.672,7.84-2.048L272,187.36V304 c0,8.832,7.168,16,16,16s16-7.168,16-16V16C304,7.168,296.832,0,288,0z"/>
			</svg>
		</button>

		<button :class="['ml-10 text-nobel', {'text-gold': playlistVisible}]" @click="$emit('playlist-click')" title="Audio ro'yxati">
			<svg class="w-6 fill-current" version="1.1" mlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve">
				<g><g><path d="M426.667,0H51.2C22.923,0,0,22.923,0,51.2v375.467c0,28.277,22.923,51.2,51.2,51.2h375.467 c28.277,0,51.2-22.923,51.2-51.2V51.2C477.867,22.923,454.944,0,426.667,0z M153.6,375.467h-51.2 c-9.426,0-17.067-7.641-17.067-17.067s7.641-17.067,17.067-17.067h51.2c9.426,0,17.067,7.641,17.067,17.067 S163.026,375.467,153.6,375.467z M153.6,256h-51.2c-9.426,0-17.067-7.641-17.067-17.067s7.641-17.067,17.067-17.067h51.2 c9.426,0,17.067,7.641,17.067,17.067S163.026,256,153.6,256z M153.6,136.533h-51.2c-9.426,0-17.067-7.641-17.067-17.067 S92.974,102.4,102.4,102.4h51.2c9.426,0,17.067,7.641,17.067,17.067S163.026,136.533,153.6,136.533z M375.467,375.467h-153.6 c-9.426,0-17.067-7.641-17.067-17.067s7.641-17.067,17.067-17.067h153.6c9.426,0,17.067,7.641,17.067,17.067 S384.892,375.467,375.467,375.467z M375.467,256h-153.6c-9.426,0-17.067-7.641-17.067-17.067s7.641-17.067,17.067-17.067h153.6 c9.426,0,17.067,7.641,17.067,17.067S384.892,256,375.467,256z M375.467,136.533h-153.6c-9.426,0-17.067-7.641-17.067-17.067 s7.641-17.067,17.067-17.067h153.6c9.426,0,17.067,7.641,17.067,17.067S384.892,136.533,375.467,136.533z"/></g></g>
			</svg>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		isPlaying: Boolean,
		playlistVisible: Boolean,
		prev: Boolean,
		next: Boolean,
	}
}
</script>
