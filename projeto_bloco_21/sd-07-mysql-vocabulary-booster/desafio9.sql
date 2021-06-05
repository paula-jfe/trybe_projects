SELECT
CONCAT(FirstName, " ", LastName) AS "Nome completo",
COUNT(o.EmployeeID) AS "Total de pedidos"
FROM w3schools.employees AS e
INNER JOIN w3schools.orders AS o
ON e.EmployeeID = o.EmployeeID
GROUP BY o.EmployeeID
ORDER BY 2;
