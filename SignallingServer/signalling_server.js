// using websocket -> The primary interface for connecting to a WebSocket server and then sending and receiving data on the connection.
// The WebSocket Protocol enables two-way communication between a client
// running untrusted code in a controlled environment to a remote host
// that has opted-in to communications from that code.  The security
// model used for this is the origin-based security model commonly used
// by web browsers.  The protocol consists of an opening handshake
// followed by basic message framing, layered over TCP.  The goal of
// this technology is to provide a mechanism for browser-based
// applications that need two-way communication with servers that does
// not rely on opening multiple HTTP connections (e.g., using
// XMLHttpRequest or <iframe>s and long polling)

// Resources that can help : https://spring.io/guides/gs/messaging-stomp-websocket/
// https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API


// while running this server, if you get a message like " Error: Cannot find module 'ws' " or module not found, then write this command on the terminal : npm install webrtc-signaling-server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 }, () => {
    console.log("Signalling server is now listening on port 8081");
});

wss.broadcast = (ws, data) => {
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', ws => {
    console.log(`Client connected. Total connected clients: ${wss.clients.size}`);

    ws.on('message', message => {
        // msg = JSON.parse(message);
        console.log(message + "\n\n");
        wss.broadcast(ws, message);
    });
    ws.on('close', ws => {
        console.log(`Client disconnected. Total connected clients: ${wss.clients.size}`);
    })

    ws.on('error', error => {
        console.log(`Client error. Total connected clients: ${wss.clients.size}`);
    });
});
