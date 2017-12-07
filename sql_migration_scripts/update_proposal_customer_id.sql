Update [SnapConnect].[dbo].[proposals] SET customer_id = 
	(SELECT
      [id]
	 FROM [SnapConnect].[dbo].[customers] where prop_id_temp_Col = SnapConnect.dbo.proposals.id)
  
