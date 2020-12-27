<template>
	<div class="fixed inset-0 z-30 bg-black bg-opacity-80">
		<div class="mobile-landscape:flex h-full w-full lg:w-11/12 xl:w-3/4 mx-auto bg-gray-100">
			<div class="mobile-landscape:w-3/5 h-2/6 md:h-4/6 mobile-landscape:h-full">
				<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/xTr6-0WdQ5U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>

			<div class="mobile-landscape:w-2/5 h-4/6 md:h-2/6 mobile-landscape:h-full lg:grid lg:grid-cols-2 lg:gap-6 py-4 px-4 lg:px-6 overflow-auto border-l border-r">
				<div class="order-1 lg:sticky top-0 mb-4 lg:mb-0 self-start">
					<button class="mb-6 text-lg font-bold rounded uppercase text-gray-500" @click="$emit('back-click')">
						&larr;<span class="ml-3">Orqaga qaytish</span>
					</button>

					<div class="px-4 pt-4 pb-6 bg-gold rounded bg-opacity-20">
						<CoverImage class="float-left mr-3" :width="100" :height="100" src="" />

						<h2 class="mb-1 text-lg font-bold">Albom sarlavhasi</h2>
						<span class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu leo felis. Vestibulum ullamcorper blandit risus vitae consequat. Nullam a faucibus orci. Duis vel volutpat dui. Curabitur vel ligula non tellus vestibulum mattis vulputate id arcu. Nullam pretium nunc in hendrerit bibendum. Sed maximus a odio quis laoreet. Morbi luctus laoreet quam dignissim laoreet. Pellentesque ut vestibulum eros, nec porta arcu.</span>
					</div>
				</div>

				<ul>
					<li v-for="i in 20" :key="i">
						<button class="flex justify-between w-full p-2 hover:bg-gold hover:bg-opacity-20 rounded cursor-pointer">
							<span class="truncate">Video sarlavhasi</span>
							<span class="ml-3 italic opacity-50">11:48</span>
						</button>
					</li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
import { onBeforeUnmount } from 'vue'
import CoverImage from '/@/components/CoverImage.vue'

export default {
	components: {CoverImage},
	setup () {
		const bodyScrollPosition = window.pageYOffset

		document.querySelector('body').classList
			.add('overflow-hidden')
		
		onBeforeUnmount(() => {
			document.querySelector('body').classList
				.remove('overflow-hidden')

			window.scrollTo(0, bodyScrollPosition)
		})
	}
}
</script>
