// Get puppy photos from Unsplash API
// Save puppy photos to the state
// Display puppy data onto the page with JSX
// Build out filtering functionality to only display photos of users chosen orientation
// https://api.unsplash.com/
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DisplayPhotos from './DisplayPhotos';
import UserSelect from './UserSelect';
function App() {
  // 1. Initialize state
  const [allPhotos, setAllPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  // 2. Making an API call to unsplash using axios
  useEffect(() => {
    axios({
      url: 'https://api.unsplash.com/search/photos',
      method: 'GET',
      dataResponse: 'json',
      params: {
        client_id: 'K3rRULb00Plv3_6vx3jb1DrKutlVMxLCdwDnF8MpFHQ',
        query: 'puppies',
        per_page: 30,
      }
    }).then((res) => {
      const puppyDataArray = res.data.results;
      // 2. Create a new array of objects with 'orientation' property on it so we can use it to filter later
      // loop and map through the array
      const photosWithOrientation = puppyDataArray.map((photoObj) => {
        // use width and height to calculate and determine orientation for each of the photo
        const photoRatio = photoObj.width / photoObj.height;
        // once determined, we will add orientation property to each of the object
        // if statement to check which photo orientation it is, and set the right orientation value on the object
        // using object spread syntax to make a copy of the original object, and add orientation property on it
        if (photoRatio < 0.8) {
          return { ...photoObj, orientation: 'portrait' }
        } else if (photoRatio > 1.2) {
          return { ...photoObj, orientation: 'landscape' }
        } else {
          return { ...photoObj, orientation: 'other' }
        }
      })
      // 3. Update the state array with new data array
      setAllPhotos(photosWithOrientation);
      // we need to set filteredPhotos state so that it's not empty on page refresh.
      setFilteredPhotos(photosWithOrientation);
    })
  }, [])
  // 4. filter function filter out and make new array of user's chosen orientation to be called on form Submit
  const filterPhotos = (chosenOrientation) => {
    // make a copy of all the photos
    const copyOfAllPhoto = [...allPhotos];
    // filter out only photos with user's chosen orientation
    const filteredPhotosArray = copyOfAllPhoto.filter((photo) => {
      return photo.orientation === chosenOrientation;
    })
    // Update filteredPhotos array
    setFilteredPhotos(filteredPhotosArray);
  }
  return (
    <div className="App">
      <h1>Show me puppies!</h1>
      {/* User select form, passing the filter function as props */}
      <UserSelect filterPhotos={filterPhotos} />
      {/* Display Photos */}
      <DisplayPhotos allPhotos={filteredPhotos} />
    </div>
  );
}
export default App;