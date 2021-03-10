// get user's selection
// somehow pass it to App.js
// use it to filter the photos array
import { useState } from 'react';
const UserSelect = (props) => {
  // Receiving props and destructuring it 
  const { filterPhotos } = props;
  // 1. Initiate state to hold user's chosen value from dropdown
  const [userChoice, setUserChoice] = useState('placeholder');
  // 2. what happens when user chooses from the dropdown
  const handleUserChoice = (event) => {
    // save user choice into the state
    setUserChoice(event.target.value);
  }
  // 3. what happens when user submits the form after they decided which orientation they want
  const handleSubmit = (event) => {
    event.preventDefault();
    // 4. call filter photos function! 
    filterPhotos(userChoice);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="photoOrientation">Show me some photos that are:</label>
      <select
        name="photoOrientation"
        id="photoOrientation"
        value={userChoice}
        onChange={handleUserChoice}>
        <option value="placeholder" disabled>Choose one:</option>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
        <option value="other">Other weird sizes</option>
      </select>
      <button>Give them puppies to mee!</button>
    </form>
  )
}
export default UserSelect;
