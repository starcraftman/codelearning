let io;

module.exports = {
    initIO: (httpServer) => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket IO not initialized.");
        }

        return io;
    }
};