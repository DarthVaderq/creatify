import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; // Импорт главного компонента
import { Provider } from 'react-redux'; // Импортируем Provider из react-redux
import store from './entities/model/store'
import './app/index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>  {/* Оборачиваем приложение в Provider */}
    <App />
  </Provider>
);