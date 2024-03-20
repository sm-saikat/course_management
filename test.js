function connect(){
    const connection = {};

    if(connection.isConnected){
        console.log('Previous connection')
        return;
    }

    console.log('New connection')
    connection.isConnected = true;
}

connect();
connect();