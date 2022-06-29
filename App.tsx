import RootNavigation from "./src/navigations";
import "react-native-gesture-handler";
import "./src/configure/firebase";
console.disableYellowBox = true;
export default function App() {
  return <RootNavigation />;
}
