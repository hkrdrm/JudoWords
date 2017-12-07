INSERT INTO [SnapConnect].[dbo].[customers] 
     ([company]
      ,[first_name]
      ,[last_name]
      ,[phone]
      ,[phone2]
      ,[sales_agent]
      ,[email]
      ,[prop_id_temp_Col])

SELECT 
         subscriber as company
      ,dbo.split(contact, ' ', 1)as first_name
      ,dbo.split(contact, ' ', 2)as last_name
      ,[phone] as phone
      ,[contactphone] as phone2
      ,[salesperson]
      ,[email]
      ,[id]
  FROM [TPISQL].[Utilities].[dbo].[TPX_Security_Proposals]