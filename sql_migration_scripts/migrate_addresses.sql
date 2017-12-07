INSERT INTO SnapConnect.dbo.addresses
  ([customer_id],
   [address1],
   [city],
   [state],
   [zipcode],
   [county],
   [district],
   [alias_label],
   [deleted])
   
SELECT 
       c.[id] as customer_id
      ,[physicaladdress]
      ,[physicalcity]
      ,[physicalstate]
      ,[physicalzip]
      ,[county]
      ,[district]
      ,'Physical Address'
      ,0

  FROM  [TPISQL].[Utilities].[dbo].[TPX_Security_Proposals] p LEFT OUTer JOIN 
  [SnapConnect].[dbo].[Customers] c on c.prop_id_temp_Col = p.id


INSERT INTO SnapConnect.dbo.addresses
  ([customer_id],
   [address1],
   [city],
   [state],
   [zipcode],
   [alias_label],
   [deleted])

SELECT
       c.[id] as customer_id
      ,[billingaddress]
      ,[billingcity]
      ,[billingstate]
      ,[billingzip]
      ,'Billing Address'
      ,0

  FROM  [TPISQL].[Utilities].[dbo].[TPX_Security_Proposals] p LEFT OUTer JOIN 
  [SnapConnect].[dbo].[Customers] c on c.prop_id_temp_Col = p.id
