SELECT
    *
FROM ingredient 
WHERE name ILIKE '%' || ${name} || '%'
AND deleted_time IS NULL
ORDER BY name