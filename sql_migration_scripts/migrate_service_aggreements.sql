INSERT INTO [SnapConnect].[dbo].[service_aggreements] 
     ([company]
      ,[first_name]
      ,[last_name]
      ,[phone]
      ,[phone2]
      ,[sales_agent]
      ,[email]
      ,[prop_id_temp_Col])

SELECT 
  FROM [TPISQL].[Utilities].[dbo].[TPX_Security_Proposals]
