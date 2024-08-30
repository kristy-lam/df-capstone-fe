const MapDisplay = ({ viewPostcode }) => {
  const postcode = viewPostcode.trim().replace(" ", "%20");
  const key = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <iframe
        title={`Map of ${postcode}`}
        src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${postcode}`}
      ></iframe>
    </>
  );
};

export default MapDisplay;
