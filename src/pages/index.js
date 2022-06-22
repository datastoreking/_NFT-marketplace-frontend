import Home from "./Home";
import Explore from "./Explore";
import LiveAuctions from "./LiveAuctions";
import ItemDetails from "./ItemDetails";
import Activity from "./Activity";
import HelpCenter from "./HelpCenter";
import Ranking from "./Ranking";
import FAQ from "./FAQ";
import Contact from "./Contact";
import ExploreCollection from "./ExploreCollection";


const routes = [
  { path: '/', component: <Home />},
  { path: '/explore', component: <Explore /> },
  { path: '/explore/:collection', component: <ExploreCollection />},
  { path: '/live-auctions', component: <LiveAuctions />},
  { path: '/nft/:nftId', component: <ItemDetails />},
  { path: '/activity', component: <Activity />},
  { path: '/help-center', component: <HelpCenter />},
  { path: '/ranking', component: <Ranking />},
  { path: '/faq', component: <FAQ />},
  { path: '/contact', component: <Contact />},
]

export default routes;