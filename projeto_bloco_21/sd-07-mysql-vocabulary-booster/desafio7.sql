SELECT
UCASE(CONCAT(e.FIRST_NAME, " ", e.LAST_NAME)) AS "Nome completo",
`START_DATE` AS "Data de início",
e.SALARY AS "Salário"
FROM hr.job_history AS jh
INNER JOIN hr.employees AS e
ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID
WHERE MONTH(jh.START_DATE) IN (1, 2, 3)
ORDER BY 1, 2;
