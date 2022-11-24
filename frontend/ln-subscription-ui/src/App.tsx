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
		fetchQrCode()
			.then((response) => {
				setQrUrl('exampleQrUrl.com');
				setIsQrLoading(false);
			});
	}

	function fetchQrCode() {
		return mockAuthReq();

		// TODO: Make real request
		const url = "example.com";
		const bodyData = {
			id: 123,
		};

		return fetch(url, {
			method: 'POST',
			body: JSON.stringify(bodyData),
		});
	}

	function mockAuthReq() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 500);
		});
	}

	return (
		<div className="app">
			<Card className="main-card">
				<h1 className="main-heading">Welcome</h1>
				<p className="main-message">Additional text</p>
				{qrUrl.length ?
					<div className="mock-qr">QR HERE</div> :
					<Button className="main-button" onClick={handleClick}>
						{ isQrLoading ? "Loading..." : "Click Here" }
					</Button>
				}
			</Card>
		</div>
	);
}

export default App;
