const DisplayPhotos = (props) => {
  const { allPhotos } = props;
  return (
    <section>
      {
        allPhotos.length === 0 ?
          <h2>No photos found! Check back later</h2>
          :
          <>
            <h2>Photos!</h2>
            <div className="photos">
              {
                allPhotos.map((photo) => {
                  return (
                    <div className="photo-container" key={photo.id}>
                      <img src={photo.urls.small} alt={photo.alt_description} />
                    </div>
                  )
                })
              }
            </div>
          </>
      }
    </section>
  )
}
export default DisplayPhotos;