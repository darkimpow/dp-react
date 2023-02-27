import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import config from "./config";

function App() {
  //useState methode used here to declare both functions imageUrl & setImageUrl

  const[imageUrl, setImageUrl]= useState(null)

  // declare the function generateImage sync with the input given
  //declares an async function where the await keyword is permitted within the function body
  const generateImage = async (inputPrompt) => {
    // declare response to await teh fetch from the api given
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      //methode/ prompt for pictures generated
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${config.API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": `${inputPrompt}`,
        "n": 1,
        "size": "512x512"
      })
    })
    const data = await response.json();
    // console log
    return data.data[0].url
  }
  const handleBlurChange = async (evt) =>{
    // this will set the initiate the loading screen to a gif that is linked to setImageUrl
    setImageUrl('https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif')
    const inputPrompt = evt.target.value;

    // on the given previous event call the api generated img and passing the prompt
    const imageUrlFromApi = await generateImage(inputPrompt);

    setImageUrl(imageUrlFromApi);

    const lookHere = (imageUrl);
  }
/////////


  return (
    <div className="App">
      <input type="text" placeholder="Search your imagination"
       className="mb-3 p-3 w-full border-2 border-gray"
       id="prompt"
      onBlur={handleBlurChange}
      />

      <div className="p-8 bg-blue-400 border-2 rounded-lg"
       id="show-image">
        {

          // if else statement if prompt is filled out display image .url if not display prompt "You must search to get started"
          imageUrl
            ? <img src={imageUrl} alt=""/>
              :"You must search to get started"
        }
      </div>
    </div>
  );
}

export default App;
