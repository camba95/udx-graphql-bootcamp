import "@babel/polyfill/noConflict";
import server from "./server";

server.start({
  port: process.env.PORT || 4000
}, () => console.info("Server running on 4000 port"));
