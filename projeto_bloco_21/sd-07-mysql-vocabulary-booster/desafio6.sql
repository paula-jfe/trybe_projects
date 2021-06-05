SELECT 
CONCAT(e.FIRST_NAME, " ", e.LAST_NAME) AS "Nome completo",
j.JOB_TITLE AS Cargo,
START_DATE AS "Data de início do cargo",
d.DEPARTMENT_NAME AS Departamento
FROM hr.job_history AS jh
INNER JOIN employees AS e
ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID
INNER JOIN hr.jobs AS j
ON jh.JOB_ID = j.JOB_ID
INNER JOIN departments AS d
ON jh.DEPARTMENT_ID = d.DEPARTMENT_ID
ORDER BY 1 DESC, 2;
