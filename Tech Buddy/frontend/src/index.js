import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
