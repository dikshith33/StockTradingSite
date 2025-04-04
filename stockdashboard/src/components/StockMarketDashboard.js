import React, { useState, useEffect } from "react";
import { Container, Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import { fetchPortfolio, buyStock, sellStock, getUserBalance } from "../services/stockService";

const STOCKS = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "GOOGL", name: "Alphabet (Google)" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "META", name: "Meta (Facebook)" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "INTC", name: "Intel" }
];


const FINNHUB_API_KEY = "cvairghr01qshflim8tgcvairghr01qshflim8u0";

const StockMarketDashboard = () => {
  const [stockData, setStockData] = useState([]);
  const [search, setSearch] = useState("");
  const [balance, setBalance] = useState(1000);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchStockPrices();
    fetchUserPortfolio();
    fetchBalance();
    const interval = setInterval(fetchStockPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStockPrices = async () => {
    try {
      const updatedStocks = await Promise.all(
        STOCKS.map(async (stock) => {
          const response = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${FINNHUB_API_KEY}`
          );
          return { symbol: stock.symbol, name: stock.name, price: response.data.c };
        })
      );
      setStockData(updatedStocks);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchUserPortfolio = async () => {
    try {
      const data = await fetchPortfolio();
      setPortfolio(data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const userBalance = await getUserBalance();
      console.log("🔄 Fetched Balance Data:", userBalance);
        const balanceValue = userBalance && !isNaN(userBalance.balance)
        ? parseFloat(userBalance.balance)  // Ensure it's a number
        : 0; 
  
      setBalance(balanceValue);
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
      setBalance(0); // Fallback value
    }
  };
  
  

  const handleBuyStock = async (stock) => {
    try {
      await buyStock(stock.symbol, stock.name, 1, stock.price);
      fetchUserPortfolio();
      fetchBalance();
    } catch (error) {
      alert("Failed to buy stock");
    }
  };

  const handleSellStock = async (stock) => {
    try {
      await sellStock(stock.symbol, 1, stock.price);
      fetchUserPortfolio();
      fetchBalance();
    } catch (error) {
      alert("Failed to sell stock");
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="text-center mt-3">💰 Balance: ${balance.toFixed(2)}</h4>
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row>
        {stockData
          .filter((stock) => stock.name.toLowerCase().includes(search.toLowerCase()))
          .map((stock) => (
            <Col key={stock.symbol} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{stock.name}</Card.Title>
                  <Card.Text>💰 Price: ${stock.price?.toFixed(2) || "N/A"}</Card.Text>
                  <Button variant="success" size="sm" onClick={() => handleBuyStock(stock)}>Buy</Button>
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => handleSellStock(stock)}>Sell</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <h2 className="mt-5">📊 My Portfolio</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Average Price</th>
            <th>Current Price</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No stocks owned</td>
            </tr>
          ) : (
            portfolio.map((stock) => {
              const currentStock = stockData.find((s) => s.symbol === stock.symbol);
              const currentPrice = currentStock ? currentStock.price : 0;
              const profitLoss = (currentPrice - stock.averagePrice) * stock.quantity;

              return (
                <tr key={stock.symbol}>
                  <td>{stock.name}</td>
                  <td>{stock.quantity}</td>
                  <td>${stock.averagePrice.toFixed(2)}</td>
                  <td>${currentPrice.toFixed(2)}</td>
                  <td style={{ color: profitLoss >= 0 ? "green" : "red" }}>
                    ${profitLoss.toFixed(2)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default StockMarketDashboard;
