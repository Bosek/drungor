export default ({ item: {
    address,
    game,
    map,
    maxPlayers,
    name,
    password,
    players,
    port,
  } }) => (
    <ul>
      <li>Game: {game}</li>
      <li>Name: {name}</li>
      <li>IP: {address}:{port}</li>
      {map && <li>Map: {map}</li>}
      <li>Players: {players}/{maxPlayers}</li>
      <li>Password: {password ? 'yes' : 'no'}</li>
    </ul>
);
