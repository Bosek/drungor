import fetch from 'isomorphic-fetch';
import Head from 'next/head';
import Server from '../components/server';

const fetchData = async (gameType, ipAddress) => {
  const data = await fetch(`http://gametracker.drungor.com/${gameType}/${ipAddress}`)
                      .then(response => {
                        if (response.status >= 400) {
                          throw new Error('Bad response from the server.');
                        }
                        return response.json();
                      })
                      .then(data => ({
                        address: data.query.address,
                        game: data.query.pretty,
                        map: data.map,
                        maxPlayers: data.maxplayers,
                        name: data.name,
                        password: data.password,
                        players: data.players.length,
                        port: data.query.port,
                        type: data.query.type,
                      }))
                      .catch(() => false);

  return data;
};

const Index = ({ servers }) => (
  <div>
    <Head>
      <title>DRUNGOR.COM</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <style global jsx>{`
      html {
        height: 100%;
        font-size: 18px;
      }
      body {
        background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%,
                    rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%,
                    rgba(0,0,0,0.40) 120%) #989898;
        background-blend-mode: multiply,multiply;
        font-family: monospace;
        text-align: center;
      }
      ul {
        list-style-type: none;
        display: inline-block;
        padding: 25px;
      }
      li {
        text-align: left;
      }
    `}</style>
    {
      servers.map(server => server && <Server key={`${server.address}:${server.ip}`} item={server} />)
    }
  </div>
);

Index.getInitialProps = async () => {
  const servers = [
    await fetchData('teamspeak3', 'ts.drungor.com'),
    await fetchData('insurgency', '89.248.242.155:27016'),
    await fetchData('insurgency', '89.248.242.155:27030'),
    await fetchData('doi', '89.248.242.155:27022'),
    await fetchData('arma3', 'drungor.com'),
  ];

  return {
    servers,
  };
};

export default Index;
