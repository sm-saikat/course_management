'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

const Chat = () => {
    const [sending, setSending] = useState(false);


    useEffect(() => {
        socket = io('http://localhost:5000', {
            withCredentials: true,
        });

        socket.on('connect', () => {
            console.log('socket connected');
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        const message = e.target.message.value;
        socket.emit('chat message', message, () => {
            console.log('message sent');
            setSending(false);
            e.target.message.value = '';
        });
    }

    return (
        <div className='w-full pt-20'>
            <div className="w-full m-auto max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className='border rounded-sm my-4 p-4'>
                    <div className='bg-blue-100 p-2 rounded-md my-2'>
                        <h3 className='text-sm text-blue-500 font-medium'>Arian Khan</h3>
                        <p>Hello Sir, How are you?</p>
                    </div>
                    <div className='bg-blue-100 p-2 rounded-md my-2'>
                        <h3 className='text-sm text-blue-500 font-medium'>Arian Khan</h3>
                        <p>Hello Sir, How are you?</p>
                    </div>
                </div>
                <form onSubmit={handleMessageSubmit}>
                    <label for="chat" class="sr-only">Your message</label>
                    <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <textarea id="message" name='message' rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                        <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            {
                                sending ? (
                                    '...'
                                ) : (
                                    <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                    </svg>
                                )
                            }
                            <span class="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Chat