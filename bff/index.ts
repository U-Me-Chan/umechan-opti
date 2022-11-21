import { Server } from 'core';
import Banner from './src/components/Banner';
import Board from './src/components/Board';
import Children from './src/components/Children';
import Feed from './src/components/Feed';
import Navbar from './src/components/Navbar';
import RadioPlayer from './src/components/RadioPlayer';
import Thread from './src/components/Thread';
import PageBoard from './src/pages/PageBoard';
import PageMain from "./src/pages/PageMain";
import PageMainLayout from './src/pages/PageMainLayout';
import PageThread from './src/pages/PageThread';

const server = new Server();
server
  .addPage(PageMain)
  .addPage(PageBoard)
  .addPage(PageThread)
  .addPage(PageMainLayout)
  .addComponent(Banner)
  .addComponent(Navbar)
  .addComponent(RadioPlayer)
  .addComponent(Feed)
  .addComponent(Board)
  .addComponent(Thread)
  .addComponent(Children)
  .listen(3001);
