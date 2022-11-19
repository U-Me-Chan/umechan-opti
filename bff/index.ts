import { Server } from 'core';
import Banner from './src/components/Banner';
import Navbar from './src/components/Navbar';
import RadioPlayer from './src/components/RadioPlayer';
import PageMain from "./src/pages/PageMain";

async function main() {
  const server = new Server();
  server
    .addPage(new PageMain())
    .addComponent(Banner)
    .addComponent(Navbar)
    .addComponent(RadioPlayer);
  await server.listen(3000);
}

main();
