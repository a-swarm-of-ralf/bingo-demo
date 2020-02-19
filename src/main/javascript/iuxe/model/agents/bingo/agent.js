import uiMain from './ui-main.js'
import uiSelectPlaylist from './ui-playlist-select.js'
import uiPlaylistTracks from './ui-playlist-tracks.js'
import uiSeedSelect from './ui-seed-select.js'
import uiCards from './ui-cards.js'
import uiPlayingBingo from './ui-playing-bingo.js'


const app = {

    name: "bingo",

    ui: { 
        main: uiMain ,
        playlists: uiSelectPlaylist,
        seed: uiSeedSelect,
        tracks: uiPlaylistTracks,
        cards: uiCards,
        play: uiPlayingBingo
    },

    initialize({ web, ontology }) {
        ontology.set('seed', 2756255);
        ontology.set('playlistName', 'bingo');
        ontology.set('playlistId', '3c1vpn1jL9GfqK20kP72xF');
        ontology.set("bingo-tested-times", 0);
        ontology.set('currentTrack', {
            name: '<<unknown>>',
            artist: '<<unknown>>',
            uri: 'spotify:track:2ndVazfRrsPu9BtRMf6z1a',
            id: '2amoaF6GMJTn0tTesdCtJp',
            duration_ms: 0,
            href: 'https://api.spotify.com/v1/tracks/2ndVazfRrsPu9BtRMf6z1a',
            image: 'https://picsum.photos/640' 
        });
        web.showPage('main', { });
                        
    },

    update({ web, ontology, player, robot }, { name, data, args }) {
        console.log(`[BINGO] update("${name}", "${data}", ${JSON.stringify(args)})`);
        
        ontology.set('message', `event "${name}" with data "${data}"`);

        if (name === 'bingo/seed-select') { web.showPage('seed', {}); }
        if (name === 'bingo/seed-updated') { ontology.set('seed', parseInt(args[0]) ); }
        if (name === 'bingo/seed-selected') { player.playlists('generating-cards'); }

        if (name === 'player/playlists' && data === 'generating-cards') { 
            console.log('[BINGO] playlists', args[0].items);
            ontology.set('playlists', args[0].items);
            web.showPage('playlists', {}); 
        }
        
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

        // Introduction
        if (name === 'bingo/start') { 
            web.showPage('play', { });
            ontology.set("chapter", "introduction");
            ontology.set('doing', `Saying "Hello, shall we play a game of musical Bingo?"`);
            robot.say("Hello, shall we play a game of musical Bingo?", "introduction/line1/spoken");
        }

        if (data === 'introduction/line1/spoken') { 
            ontology.set('doing', `Saying "Every body should have received a bingo card with nine songs."`);
            robot.say("Every body should have received a bingo card with nine songs.", "introduction/line2/spoken");
        }

        if (data === 'introduction/line2/spoken') { 
            ontology.set('doing', `Saying "Next I will play a song. If you recognize the song mark it of on your card."`);
            robot.say("Next I will play a song. If you recognize the song mark it of on your card.", "introduction/line3/spoken");
        }

        if (data === 'introduction/line3/spoken') { 
            ontology.set('doing', `Saying "If you have marked three songs in row on your..."`);
            robot.say("If you have marked three songs in row on your card shout BINGO as loud as you can.", "introduction/line4/spoken");
        }

        if (data === 'introduction/line4/spoken') { 
            ontology.set('doing', `Saying "Let's try it now. When I say now, you shout bingo."`);
            robot.say("Let's try it now. When I say now, you shout bingo.", "introduction/line5/spoken");
        }

        if (data === 'introduction/line5/spoken') { 
            ontology.set('doing', `Saying "Ok, let's hear it. Now!"`);
            robot.listen([ "Bingo" ], "testing-bingo");
            robot.say("Ok, let's hear it. Now!");
            ontology.set("bingo-testing", true);
            ontology.set("bingo-tested-times", 0);
            web.timeout(12000, "introduction/wait-for-bingo");
        }

        if (
            (name === 'robot/WordRecognized' && data === "testing-bingo" && ontology.get("bingo-testing", true)) ||
            (name === 'bingo/call-bingo' && ontology.get("bingo-testing", true)) 
         ) { 
            ontology.set('doing', `Very good. Nice!, Now Let's start!"`);
            ontology.set("bingo-testing", false);
            robot.say("Very good. Nice!, Now Let's start!", "introduction/finished");
        }

        if (data === 'introduction/wait-for-bingo'  && ontology.get("bingo-tested-times", 3) < 3 && ontology.get("bingo-testing", true)) { 
            ontology.set('doing', `Saying "I did not hear anything. Let's try again. Shout Bingo! Bingo!"`);
            ontology.set("bingo-tested-times", ontology.get("bingo-tested-times", 3) + 1);
            robot.say("I did not hear anything. Let's try again. Shout Bingo! Bingo!");
            web.timeout(12000, "introduction/wait-for-bingo");
        }

        if (data === 'introduction/wait-for-bingo' && ontology.get("bingo-tested-times", 3) > 2 && ontology.get("bingo-testing", true)) { 
            ontology.set('doing', `Saying "Saying "Well I did not hear anything again. But let's start anyway."`);
            ontology.set("bingo-testing", false);
            robot.say("Well I did not hear anything again. But let's start anyway.", "introduction/finished");
        }

        // Call and Play Songs
        if (data === 'introduction/finished') { 
            ontology.set('doing', `Saying "Saying "I will play the first song."`);
            ontology.set("chapter", "playing");
            robot.listen([ "Bingo" ], "hear-bingo-during-playing");
            robot.say("I will play the first song.", "introduced/first-song");
        }
  
        if (data === 'introduced/first-song') {
            const track = ontology.get('playorder[0]');
            ontology.set('doing', `Playing "${track.name}" from "${track.artist}"`);
            ontology.set("song-number", 0);
            ontology.set('currentTrack', track);
            player.playTrack(track.uri, 'playing-song');
        }

        if (data === 'playing-song') {
            web.timeout(45000, "playing-song-waiting");
        }

        if (data === 'playing-song-waiting') {
            ontology.set('doing', `Pausing current song."`);
            player.pause('playing-song-paused')
        }

        if (data === 'playing-song-paused') {
            ontology.set('doing', `Saying "That was it."`);
            robot.say("That was it. Remember to mark it off on your card.", "introduced/next-song");
        }

        if (data === 'introduced/next-song') {
            const index = ontology.get("song-number", 0) + 1;
            const tracks = ontology.get('playorder');
            const track = tracks[index];
            console.log(`[BINGO] Next song is ${index}: "${track.name}" [ ${index} / ${tracks.length}]`)
            if (index < tracks.length) {
                console.log(`[BINGO] Playing song [${index}/${tracks.length}] ${tracks.length < index}`)
                ontology.set("song-number", index);
                ontology.set('currentTrack', track);
                ontology.set('doing', `Playing "${track.name}" from "${track.artist}"`);
                ontology.set('currentTrack', track);
                player.playTrack(track.uri, 'playing-song');   
            } else {
                console.log(`[BINGO] Last song played [${index}/${tracks.length}] ${tracks.length < index}`)
                ontology.set('doing', `Saying "That was the last song."`);
                robot.say("That was the last song.", "all-tracks-finished");
            }   
        }

        // Bingo Called
        if (
            (name === 'robot/WordRecognized' && data === "hear-bingo-during-playing") ||
            (name === 'bingo/call-bingo' && ontology.get('chapter', '') === "playing")
         ) {
            ontology.set('doing', `Saying "Heared Bingo. Wondefull!"`);
            player.pause('pause-because-bingo-called');
            robot.say("Heared Bingo. Wondefull! Please show you card to on of our people.", "introduced/next-song");
        }

        // Bingo Called
        if (name === 'bingo/continue') {
            ontology.set('doing', `Saying "Alright, let's continue."`);
            robot.say("Alright, let's continue. I'll play the next song.", "spoke-because-bingo-called");
        }

        if (name === 'bingo/generate/cancel') { web.showPage('main', { }); }
    }
}

export default app;