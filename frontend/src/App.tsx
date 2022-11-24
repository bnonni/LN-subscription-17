import React, { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import "./App.css";

function App() {
	const [isQrLoading, setIsQrLoading] = useState(false);
	const [qrUrl, setQrUrl] = useState('');

	function handleClick() {
		// TODO: Fire QR request, parse image?
		setIsQrLoading(true);
		fetchQrCode();
		setIsQrLoading(false);
	}

	function fetchQrCode() {
		window.location.replace("http://127.0.0.1:2121/v1/signup/lnurl")
	}

	return (
		<div className="app">
			<Card className="main-card">
				<h1 className="main-heading">Welcome to LN Subscription 17</h1>
				{qrUrl.length ?
					<div className="mock-qr">QR HERE</div> :
					<Button className="main-button" onClick={handleClick}>
						{isQrLoading ? "Loading..." : "⚡️ Login with Lightning"}
					</Button>
				}
			</Card>
		</div>
	);
}

export default App;
