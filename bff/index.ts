import { Server } from 'core';
import Banner from './src/components/Banner';
import Board from './src/components/Board';
import Feed from './src/components/Feed';
import Navbar from './src/components/Navbar';
import RadioPlayer from './src/components/RadioPlayer';
import PageBoard from './src/pages/PageBoard';
import PageMain from "./src/pages/PageMain";

const server = new Server();
server
  .addPage(PageMain)
  .addPage(PageBoard)
  .addComponent(Banner)
  .addComponent(Navbar)
  .addComponent(RadioPlayer)
  .addComponent(Feed)
  .addComponent(Board)
  .listen(3000);
