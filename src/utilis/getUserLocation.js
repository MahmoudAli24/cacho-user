export const fetchLocation = async (language) => {
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');

    if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        if (latitude === null || longitude === null || latitude === undefined || longitude === undefined || latitude === "undefined" || longitude === "undefined" || latitude === "" || longitude === "NaN" || latitude === "NaN" || longitude === "") {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        }
        const userLocationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBhs9awrQC82lygPiy4Cq91xyX9s3WUjUI&language=${language}`);

        const userLocation = await userLocationResponse.json();

        const locationContent = userLocation?.plus_code?.compound_code.split(" ");
        const location = locationContent.slice(1).join(" ");
        // set location in local storage
        localStorage.setItem('location', location);
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude)
        return {location, latitude, longitude};
    } else {
        throw new Error('Please enable location permission');
    }
};
