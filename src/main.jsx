
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss"
import { UserContextProvider } from './context/UserContext.jsx'
import { BusinessContextProvider } from './businessContext/BusinessContext.jsx'
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"
import {persistor, store} from "./redux/store"


ReactDOM.createRoot(document.getElementById('root')).render(
    <BusinessContextProvider>
       <UserContextProvider>
       <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
           <App/>
        </PersistGate>
       </Provider>
       </UserContextProvider>
    </BusinessContextProvider>
)
