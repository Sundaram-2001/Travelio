

const CREATE_TRIP_CTE = `
    WITH inserted_trip AS (
    INSERT INTO trips (fromm_location,to_location,date_of_travel,user_id,number_of_days,mpde_of_transport,return_date)
    VALUES ($1, $2, $3, $4)
    RETURNING trip_id
    )
    INSERT INTO mode_of_transport (trip_id, mode,pickup_point,drop_point,user_id,pnr, flight_no, transport_type)
    SELECT id, $5, $6, $7 FROM inserted_trip
    RETURNING trip_id;
`;

export const createTripAtomic = async (db, data) => {
  const values = [
    data.city, 
    data.start_date, 
    data.user_id, 
    data.origin, 
    data.pnr, 
    data.flight_no, 
    data.type
  ];
  
  // This sends the query to Supabase/Postgres
  const result = await db.query(CREATE_TRIP_CTE, values);
  return result.rows[0].trip_id;
};