// src/pages/AdminPanel.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout"; 
import layoutStyles from "../Style/AdminLayout.module.css"; // shared layout CSS
import styles from "../Style/AdminDashbord.module.css"; // page-specific CSS
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminPanel = () => {
  const salesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 200 },
    { month: "Mar", sales: 150 },
    { month: "Apr", sales: 300 },
    { month: "May", sales: 250 },
    { month: "Jun", sales: 400 },
    { month: "Jul", sales: 350 },
    { month: "Aug", sales: 420 },
    { month: "Sep", sales: 380 },
    { month: "Oct", sales: 500 },
    { month: "Nov", sales: 450 },
    { month: "Dec", sales: 600 },
  ];

  const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Cosmetics", value: 200 },
    { name: "Home Decor", value: 100 },
  ];

  const totalProducts = 120;
  const totalPurchase = 75;
  const totalSales = 95;

  const COLORS = [
    "var(--chart-color-1)",
    "var(--chart-color-2)",
    "var(--chart-color-3)",
    "var(--chart-color-4)",
  ];

  return (
    <AdminLayout>
      <Container fluid className={layoutStyles.adminContainer}>
        <Row className="mb-4">
          <Col md={4} sm={6} xs={12}>
            <Card className={`${styles.statsCard} ${styles.bgColor1}`}>
              <Card.Body>
                <Card.Title>Total Products</Card.Title>
                <h3>{totalProducts}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12}>
            <Card className={`${styles.statsCard} ${styles.bgColor2}`}>
              <Card.Body>
                <Card.Title>Total Purchases</Card.Title>
                <h3>{totalPurchase}</h3>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12}>
            <Card className={`${styles.statsCard} ${styles.bgColor3}`}>
              <Card.Body>
                <Card.Title>Total Sales</Card.Title>
                <h3>{totalSales}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={8} xs={12} className="mb-4">
            <Card className={styles.chartCard}>
              <Card.Body>
                <Card.Title className={styles.chartTitle}>Monthly Sales</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="var(--bar-chart-color)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} xs={12} className="mb-4">
            <Card className={styles.chartCard}>
              <Card.Body>
                <Card.Title className={styles.chartTitle}>Sales by Category</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminPanel;
