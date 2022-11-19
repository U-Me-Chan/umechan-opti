import { Server } from 'core';
import Banner from './src/components/Banner';
import Feed from './src/components/Feed';
import Navbar from './src/components/Navbar';
import RadioPlayer from './src/components/RadioPlayer';
import PageMain from "./src/pages/PageMain";

async function main() {
  const server = new Server();
  server
    .addPage(new PageMain())
    .addComponent(Banner)
    .addComponent(Navbar)
    .addComponent(RadioPlayer)
    .addComponent(Feed);
  await server.listen(3000);
}

main();
