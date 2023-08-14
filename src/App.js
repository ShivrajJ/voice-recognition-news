import {React, useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/newsCards';
import useStyles from './styles';

const alanKey = '3f237104ad109eb09c19b8d646b255652e956eca572e1d8b807a3e2338fdd0dc/stage'
const alanLogoSrc = 'https://alan.app/alan-brand-images/logo-vertical/color/alan-logo-vertical-color.png';

function App() {
  const[newsArticles, setNewsArticles] = useState([]);
  const[activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number}) => {
        console.log(command);
        if(command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}) : number;
          console.log(parsedNumber);
          // console.log(articles[parsedNumber-1].url);
          console.log(articles.length);
          if(parsedNumber <= articles.length && articles[parsedNumber-1]) {
            window.open(articles[parsedNumber-1].url, '_blank');
          }
        }
      }
    })
  },[])
  return (
    <div className="App">
      <body>
        <div className={classes.logoContainer}>
          <img src={alanLogoSrc} className={classes.alanLogo} alt="Alan Logo"/>
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
      </body>
    </div>
  );
}

export default App;
