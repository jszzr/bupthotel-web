function AdminPage() {
  const rooms = ['Room 1', 'Room 2', 'Room 3'] // Replace this with actual room data

  return (
    <div>
      <h1>Admin Page</h1>
      {rooms.map((room) => (
        <div key={room}>
          <h2>{room}</h2>
        </div>
      ))}
    </div>
  )
}

export default AdminPage