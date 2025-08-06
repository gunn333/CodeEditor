import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');

	const createNewRoom = e => {
		e.preventDefault();
		const id = uuidV4();
		setRoomId(id);
		toast.success('Created a new room');
	};

	const joinRoom = async () => {
		if (!roomId || !username) {
			toast.error('ROOM ID & username is required');
			return;
		}

		try {
			const res = await fetch('http://localhost:5000/api/users/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, roomId })
			});

			const data = await res.json();
			if (!res.ok) {
				toast.error(data.error || 'Failed to save user');
				return;
			}

			toast.success('User info saved to DB');
			navigate(`/editor/${roomId}`, { state: { username } });
		} catch (err) {
			toast.error('Server error');
			console.error(err);
		}
	};

	const handleInputEnter = e => {
		if (e.code === 'Enter') joinRoom();
	};

	return (
		<div className="homePageWrapper">
			<div className="formWrapper">
				<img
					className="homePageLogo"
					src="/mv4egmyh-removebg-preview.png"
					alt="code-sync-logo"
				/>
				<h4 className="mainLabel">Paste invitation ROOM ID</h4>
				<div className="inputGroup">
					<input
						type="text"
						className="inputBox"
						placeholder="ROOM ID"
						value={roomId}
						onChange={e => setRoomId(e.target.value)}
						onKeyUp={handleInputEnter}
					/>
					<input
						type="text"
						className="inputBox"
						placeholder="USERNAME"
						value={username}
						onChange={e => setUsername(e.target.value)}
						onKeyUp={handleInputEnter}
					/>
					<button className="btn joinBtn" onClick={joinRoom}>
						Join
					</button>
					<span className="createInfo">
						If you don't have an invite then create&nbsp;
						<a
							onClick={createNewRoom}
							href="/"
							className="createNewBtn"
						>
							new room
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
