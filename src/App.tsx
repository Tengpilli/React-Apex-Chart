import BiDirectionChart from "./components/BiDirectionBar";
import TEST_STOCK_DATA from "./mockup/testStockData.json";
import { Stock } from "./types/stock";

export default function App() {

  //You can personalize the properties easily yourself
  //e.g 
  // <BiDirectionChart data={TEST_STOCK_DATA as Stock[]} color=["#1ac4bd", "#ffa800"]
  //   titleText="One Minute Candle stock" maxpercentage="10",minpercentage="-100" />

  return <BiDirectionChart data={TEST_STOCK_DATA as Stock[]} />;
}
