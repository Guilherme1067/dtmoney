import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import {App} from './App';

createServer ({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
        transactions: [
          {
            id: 1,
            title: "Freelancer do Gui",
            type: "deposit",
            category: 'Desenvolvimento',
            amount: 10000,
            createdAt: new Date("2021-09-15 12:00:00")
          },
          {
            id: 2,
            title: "Dividas do Gui",
            type: "withdraw",
            category: 'Pagamentos',
            amount: 20000,
            createdAt: new Date("2021-09-25 12:00:00")
          },
        ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
        return this.schema.all('transaction')
    })

    this.post('/transactions', (schema,request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

