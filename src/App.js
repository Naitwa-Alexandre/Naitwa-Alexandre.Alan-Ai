import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';


const alanKey = 'b87f9069f1c55e172b8a11681e06c6802e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

    const [newsArticles, setNewesArticles] = useState([]);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles }) => {
                if(command === 'newHeadlines') {
                    setNewesArticles(articles);
                }
            }
        })
    }, [])

    return (
        <div>
            <h1>Alan AI News Aplication</h1>
            <NewsCards articles={newsArticles} />
        </div>
    )
}

export default App;
