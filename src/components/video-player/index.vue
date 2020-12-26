<template>
	<div class="absolute top-0 bottom-0 left-0 right-0 z-30 py-1 bg-black bg-opacity-80">
		<div class="mobile-landscape:flex h-full w-full lg:w-11/12 xl:w-3/4 mx-auto bg-white">
			<div class="mobile-landscape:w-3/5 mobile-landscape:h-full h-2/6 sm:h-2/4">
				<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/xTr6-0WdQ5U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>

			<div class="mobile-landscape:w-2/5 mobile-landscape:h-full h-4/6 sm:h-2/4 lg:grid lg:grid-cols-2 lg:gap-6 py-4 px-4 lg:px-6 overflow-auto border-l border-r">
				<button class="mb-6 text-lg font-bold rounded uppercase text-gray-500" @click="$emit('back-click')">
					&larr; <span class="ml-2">Orqaga qaytish</span>
				</button>

				<div class="order-1 lg:sticky top-0 mb-4 lg:mb-0 px-4 pt-4 pb-6 self-start bg-gold rounded bg-opacity-20">
					<CoverImage class="float-left mr-3" :width="100" :height="100" src="" />

					<h2 class="mb-1 text-lg font-bold">Albom sarlavhasi</h2>
					<span class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu leo felis. Vestibulum ullamcorper blandit risus vitae consequat. Nullam a faucibus orci. Duis vel volutpat dui. Curabitur vel ligula non tellus vestibulum mattis vulputate id arcu. Nullam pretium nunc in hendrerit bibendum. Sed maximus a odio quis laoreet. Morbi luctus laoreet quam dignissim laoreet. Pellentesque ut vestibulum eros, nec porta arcu.</span>
				</div>

				<ul>
					<li v-for="i in 10" :key="i">
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
