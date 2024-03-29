import { Server } from "socket.io";
import {getSession} from 'next-auth/react';

export default function handler(req, res) {
	if (res.socket.server.io) {
		return res.status(200).json({
			success: true,
			message: "Socket is already running",
		});
	}

	console.log("Starting Socket.IO server on port:");

	const io = new Server(res.socket.server);

	io.use(async (socket, next) => {
		const session = await getSession({ req: socket.request });
		socket.user = session?.user;
		return next();
	});

	io.on("connection", (socket) => {
		console.log("A user connected", socket.id);
		socket.on("disconnect", () => {
			console.log("A user disconnected");
		});

		socket.on("message:request", async (data, cb) => {
			cb("Message received");

			// Save message to database
			const response = await fetch(
				"http://localhost:3000/api/messages",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						courseId: data.courseId,
						message: data.message,
						user: socket.user,
					}),
				}
			);

			if (response.status === 201) {
				console.log("Message saved");
				const result = await response.json();
				io.emit("message:response", result.data);
			}
		});
	});

	res.socket.server.io = io;
	return res.status(201).json({ success: true, message: "Socket is started" });
}
