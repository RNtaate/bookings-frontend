import React from 'react';

let MassageForm = () => {
  return (
    <div>
      <h3>New Massage Type</h3>
      <form>
        <input type="text" name="name" placeholder="Name of Massage" required/>
        <textarea name="description" placeholder="Massage Description" required></textarea>
        <input type="number" name="price" placeholder="price" required />
        <input type="number" name="duration" placeholder="price" required />
        <input type="file" required />
        <button type="submit">Create Massage Type</button>
      </form>
      <button>Cancel</button>
    </div>
  )
}

export default MassageForm;