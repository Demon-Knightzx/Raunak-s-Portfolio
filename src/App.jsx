import { gsap } from "gsap";
import{Draggable} from "gsap/Draggable";
import {Terminal, Safari, Resume, Finder,Text,Image ,Contact} from "#windows/index.js";
import { Navbar , Welcome ,Dock } from  "#components";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
       <main>
           <Navbar/>
           <Welcome/>
           <Dock/>
           <Terminal/>
           <Safari/>
           <Resume/>
           <Finder/>
           <Text/>
           <Image/>
           <Contact />
       </main>
  );
};
export default App;

