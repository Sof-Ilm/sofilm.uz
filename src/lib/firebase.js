import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
})

if (process.env.NODE_ENV === 'production') {
	import('firebase/analytics')
		.then(() => firebase.analytics())
}

export const ERR_PERMISSION = 'PERMISSION_DENIED'
export const db = firebase.firestore()
