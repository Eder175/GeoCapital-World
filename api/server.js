const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/debts', (req, res) => {
  res.json([
    { id: 1, descricao: 'Cartão de crédito', valor: 1200 },
    { id: 2, descricao: 'Empréstimo pessoal', valor: 3500 },
    { id: 3, descricao: 'Financiamento carro', valor: 8000 }
  ]);
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
