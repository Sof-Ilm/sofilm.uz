import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export const ERR_PERMISSION = 'PERMISSION_DENIED'
export const db = firebase.firestore()
