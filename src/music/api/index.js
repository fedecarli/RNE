// @flow
import * as _ from "lodash";

import type {Picture} from "../../components/Model";

const me = require("./me");
const albums = require("./albums");
const heartsWereGold = require("./albums/hearts-were-gold");
const brother = require("./albums/brother");
const whereWeWere = require("./albums/where-we-were");
const ribbons = require("./albums/ribbons");
const doSomethingBeautiful = require("./albums/do-something-beautiful");
const goGetGone = require("./albums/go-get-gone");
const inColour = require("./albums/in-colour");
const mountains = require("./albums/mountains");
const pyk = require("./albums/pyk");
const melodrama = require("./albums/melodrama");
const ibnRlLeil = require("./albums/ibn-el-leil");
const shakira = require("./albums/shakira");

export type Track = {
    name: string,
    uri: string
};

export type Album = {
    id: string,
    name: string,
    artist: string,
    picture: Picture
};

export type PlaylistEntry = {
    album: Album,
    track: Track
};

export type Playlist = {
    id: string,
    name: string,
    entries: PlaylistEntry[]
};

export type User = {
    id: string,
    name: string,
    picture: string,
    caption: string,
    cover: Picture
};

export type Music = {
    albums: Album[],
    tracks: string => Track[],
    playlists: Playlist[],
    me: User,
    transformAlbumToPlaylist: Album => Playlist
};

const tracks: { [album: string]: Track[] } = {
    "hearts-were-gold": heartsWereGold,
    brother,
    "where-we-were": whereWeWere,
    ribbons,
    "do-something-beautiful": doSomethingBeautiful,
    "go-get-gone": goGetGone,
    "in-colour": inColour,
    mountains,
    pyk,
    melodrama,
    "ibn-el-leil": ibnRlLeil,
    shakira
};

const entry = (albumId: string, trackName: string): PlaylistEntry => ({
    album: _.find(albums, album => album.id === albumId),
    track: _.find(tracks[albumId], track => track.name === trackName)
});

const playlists: Playlist[] = [
    {
        id: "todays-hits",
        name: "Today's Hits",
        isAlbum: false,
        entries: [
            entry("melodrama", "Green Light"),
            entry("ibn-el-leil", "Roman"),
            entry("shakira", "Dare (La La La)"),
            entry("in-colour", "Loud Places (feat. Romy)"),
            entry("do-something-beautiful", "Do Something Beautiful"),
            entry("pyk", "Bones")
        ]
    },
    {
        id: "little-victories",
        name: "Little Victories",
        isAlbum: false,
        entries: [
            entry("hearts-were-gold", "Do Something Beautiful"),
            entry("go-get-gone", "Endless Road"),
            entry("where-we-were", "Cell Dilution"),
            entry("hearts-were-gold", "Hearts Were Gold"),
            entry("melodrama", "Green Light"),
            entry("shakira", "Dare (La La La)")
        ]
    }
];

const api: Music = {
    albums,
    tracks: (album: string) => tracks[album],
    playlists,
    me,
    transformAlbumToPlaylist: (album: Album): Playlist => ({
        id: album.id,
        name: album.name,
        isAlbum: true,
        entries: tracks[album.id].map(track => ({ album, track }))
    })
};

export default api;
