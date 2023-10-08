import '@styles/global.css';
import { Inter } from 'next/font/google';
import { Provider, Nav } from '@components';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Promptopia | Dilkash Shaikh Mahajan',
	description: 'Discover & Share AI Prompts',
};

const RootLayout = ({ children }) => (
	<html lang='en'>
		<body>
			<Provider>
				<div className='main'>
					<div className='gradient' />
				</div>

				<main className='app'>
					<Nav />
					{children}
				</main>
			</Provider>
		</body>
	</html>
);

export default RootLayout;
