const formatISODuration = duration => {
	const timeExtractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/
	const extracted = timeExtractor.exec(duration)
	const hours = parseInt(extracted[1], 10) || 0
	const minutes = parseInt(extracted[2], 10) || 0
	const seconds = parseInt(extracted[3], 10) || 0

	const totalSeconds = (hours * 3600) + (minutes * 60) + seconds

	return [
		parseInt(totalSeconds / 60 % 60),
		parseInt(totalSeconds % 60)
	].join(":").replace(/\b(\d)\b/g, "0$1")
}

export async function getPlaylistVideos (playlistId) {
	const playlistItemsUrl = new URL('https://youtube.googleapis.com/youtube/v3/playlistItems')

	playlistItemsUrl.searchParams.append('part', 'contentDetails')
	playlistItemsUrl.searchParams.append('maxResults', 1)
	playlistItemsUrl.searchParams.append('playlistId', playlistId)
	playlistItemsUrl.searchParams.append('key', import.meta.env.VITE_YOUTUBE_API_KEY)
	
	let result = []
	let hasMoreData = true
	const videosUrl = new URL('https://youtube.googleapis.com/youtube/v3/videos')

	videosUrl.searchParams.append('part', 'contentDetails')
	videosUrl.searchParams.append('part', 'snippet')
	videosUrl.searchParams.append('key', import.meta.env.VITE_YOUTUBE_API_KEY)

	while (hasMoreData) {
		try {
			const playlistItem = await fetch(playlistItemsUrl).then(r => r.json())

			videosUrl.searchParams.delete('id')

			playlistItem.items.forEach(({ contentDetails }) => {
				videosUrl.searchParams.append('id', contentDetails.videoId)
			})

			const videos = await fetch(videosUrl).then(r => r.json())

			result = [
				...result,
				...videos.items.map(v => {
					return {
						id: v.id,
						title: v.snippet.title,
						duration: formatISODuration(v.contentDetails.duration),
					}
				})
			]

			if (playlistItem.nextPageToken) {
				playlistItemsUrl.searchParams.set('pageToken', playlistItem.nextPageToken)
			}
			else {
				hasMoreData = false
			}
		}
		catch (err) {
			hasMoreData = false
			console.error(err)
		}
	}

	return result
}
