import Navbar from './components/Navbar'
import CartList from './components/CartList'

import './App.css'
import store from './store/store'
import { Provider } from 'react-redux'
import Pricebox from './components/PriceBox'

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <Pricebox />
    </Provider>
  )
}

export default App
