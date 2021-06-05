SELECT Country AS País
FROM w3schools.customers
UNION
SELECT Country FROM w3schools.suppliers
ORDER BY 1
LIMIT 5;
