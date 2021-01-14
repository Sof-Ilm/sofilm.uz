<template>
	<div
		class="hidden md:block absolute top-0 left-0 right-0 p-4 bg-black bg-opacity-25">
		<button class="px-2 py-1 font-bold rounded bg-black bg-opacity-75 hover:bg-red-700 uppercase text-gray-300" @click="$emit('back-click')">
			&larr;<span class="ml-3">Orqaga qaytish</span>
		</button>
	</div>
</template>
