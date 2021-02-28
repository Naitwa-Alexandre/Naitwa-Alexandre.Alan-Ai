import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';


const alanKey = 'b87f9069f1c55e172b8a11681e06c6802e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle, setActiveArticle] = useState(-1);
    const alanLogoSrc = 'https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg';

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parseNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true }) : number;
                    const article = articles[parseNumber - 1]

                    if(parseNumber > 20) {
                        alanBtn().playText('Please try that again.');
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src={alanLogoSrc} className={classes.alanLogo} alt="alanLogo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App;
