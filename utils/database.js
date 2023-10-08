import mongoose from 'mongoose';

let isConnected = false;
export const connectionDB = async () => {
	mongoose.set('strictQuery', true);
	if (isConnected) {
		console.log('Mongodb Connected Successfully');
		return;
	} else {
		try {
			await mongoose.connect(process.env.MONGODB_URI);

			isConnected = true;
			console.log('MongoDB Connected');
		} catch (error) {
			console.log(error);
		}
	}
};
