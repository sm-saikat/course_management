'use client';

import { Spinner } from 'flowbite-react';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = ({ params }) => {
    const [socket, setSocket] = useState(null);
    const [sending, setSending] = useState(false);
    const [messageItems, setMessageItems] = useState([]);
    const [user, setUser] = useState(null);
    const [loadingMessages, setLoadingMessages] = useState(true);

    const chatContainer = useRef(null);
    const chatForm = useRef(null);

    async function fetchMessages() {
        const session = await getSession();
        setUser(session.user);

        const response = await fetch(`http://localhost:3000/api/messages?courseId=${params.id}`);
        if (response.status === 200) {
            const data = await response.json();
            setMessageItems(data.data);
            setLoadingMessages(false);
        }
    }

    useEffect(() => {
        console.log(chatContainer.current)
        fetchMessages();

        const newSocket = io('http://localhost:5000', {
            withCredentials: true,
        });

        newSocket.on('message:response', (data) => {
            setMessageItems(prev => [...prev, data]);
        })

        newSocket.on('connect', () => {
            console.log('socket connected');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, []);

    useEffect(() => {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        console.log('Scrolled')
    }, [messageItems]);

    const handleMessageSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        setSending(true);

        const message = e.target.message.value;

        const messageObj = {
            courseId: params.id,
            message
        }

        socket.emit('message:request', messageObj, (data) => {
            e.target.message.value = '';
            setSending(false);
        });
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter pressed');
            console.log(chatForm.current)
            e.preventDefault();
            chatForm.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }

    return (
        <div className='w-full pt-2'>
            <div className="w-full m-auto max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className='border rounded-sm my-4 p-4 max-h-[400px] overflow-y-auto' ref={chatContainer}>
                    {
                        messageItems.length > 0 ? messageItems.map((item, i) => {
                            return (
                                <div key={i} className={`p-2 rounded-md my-2 w-1/2 ${user.email == item.sender.email ? 'ms-auto me-0 bg-blue-100 ' : 'ms-0 me-auto bg-gray-100'}`}>
                                    <h3 className='text-sm text-blue-500 font-medium'>{item.sender.name}</h3>
                                    <p>{item.message}</p>
                                </div>
                            )
                        }) : <p className='w-full text-center dark:text-gray-400'>{loadingMessages ? 'Loading messages...' : 'No message available.'}</p>
                    }
                </div>
                <form ref={chatForm} onSubmit={handleMessageSubmit}>
                    <label htmlFor="chat" className="sr-only">Your message</label>
                    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <textarea onKeyDown={handleEnterPress} id="message" name='message' rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            {
                                sending ? (
                                    '...'
                                ) : (
                                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                    </svg>
                                )
                            }
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Chat