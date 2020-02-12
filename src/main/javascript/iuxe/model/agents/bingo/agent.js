import uiMain from './ui-main.js'
import uiSelectPlaylist from './ui-playlist-select.js'
import uiPlaylistTracks from './ui-playlist-tracks.js'
import uiSeedSelect from './ui-seed-select.js'
import uiCards from './ui-cards.js'


const app = {

    name: "bingo",

    ui: { 
        main: uiMain ,
        playlists: uiSelectPlaylist,
        seed: uiSeedSelect,
        tracks: uiPlaylistTracks,
        cards: uiCards,
    },

    initialize({ web, ontology }) {
        ontology.set('seed', 2756255);
        ontology.set('playlistName', 'bingo');
        ontology.set('playlistId', '3c1vpn1jL9GfqK20kP72xF');
        web.showPage('main', { });
    },

    update({ web, ontology, player }, { name, data, args }) {
        console.log(`[BINGO] update("${name}", "${data}", ${_.chain(args).map(i => `"${i}"`).join(args, ', ').value()})`);
        ontology.set('message', `event "${name}" with data "${data}"`);

        if (name === 'bingo/seed-select') { web.showPage('seed', {}); }
        if (name === 'bingo/seed-updated') { ontology.set('seed', parseInt(args[0]) ); }
        if (name === 'bingo/seed-selected') { player.playlists('generating-cards'); }

        if (name === 'player/playlists' && data === 'generating-cards') { 
            console.log('[BINGO] playlists', args[0].items);
            ontology.set('playlists', args[0].items);
            web.showPage('playlists', {}); }
        
        if (name === 'bingo/playlist-selected') { 
            console.log(`[BINGO] playlist-selected`, args[0]);
            ontology.set('playlistName', args[0].name);
            ontology.set('playlistId', args[0].id);
            ontology.set('playlist', args[0]);
            player.tracks(args[0].id)
         }

         if (name === 'player/tracks') { 
            const items = _.get(args, '[0].items', []);
            console.log(`[BINGO] items: `, items);

            const tracks = _.map(items, item => {
                return {
                    name: _.get(item, 'track.name', '<<unknown>>'),
                    artist: _.get(item, 'track.artists[0].name', '<<unknown>>'),
                    uri: _.get(item, 'track.uri', 'spotify:track:2ndVazfRrsPu9BtRMf6z1a'),
                    id: _.get(item, 'track.id', '2amoaF6GMJTn0tTesdCtJp'),
                    duration_ms: _.get(item, 'track.duration_ms', 0),
                    href: _.get(item, 'track.href', 'https://api.spotify.com/v1/tracks/2ndVazfRrsPu9BtRMf6z1a'),
                    image: _.get(item, 'track.album.images[0]', { url: 'https://picsum.photos/640' })
                }
            });

            console.log(`[BINGO] tracks: `, tracks);

            ontology.set('tracks', tracks);
            web.showPage('tracks', {});
         }
        

        if (name === 'bingo/generate') { 
            const tracks = ontology.get('tracks', []);
            const cards = _.times(6, index => ({ index, title: `Card ${index}`, tracks: _.sampleSize(tracks, 9) }));
            ontology.set('cards', cards);
            ontology.set('playorder', _.shuffle(tracks));
            web.showPage('cards', { }); 
        }

        if (name === 'bingo/generate/cancel') { web.showPage('main', { }); }
    }
}

export default app;