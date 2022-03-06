import Routes from './routes/Routes';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/store';

import { configureFakeBackend } from './helpers';

// Themes
// For Default import Theme.scss
import './assets/scss/Theme.scss';

// For Dark import Theme-Dark.scss
// import './assets/scss/Theme-Dark.scss';

// configure fake backend
configureFakeBackend();



const App = () => {
    const isLoading = useSelector((state: RootState) => state)
    console.log("zazea");
    
console.log(isLoading);
    return (
        <>
            <Routes></Routes>
        </>
    );
};

export default App;
