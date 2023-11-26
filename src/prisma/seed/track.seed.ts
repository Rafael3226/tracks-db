import { PrismaClient } from "@prisma/client";
import { readJsonFile } from "../../util/read-json-file";
import { randomUUID } from "crypto";
import { findJsonFilesInDirectory } from "../../util/find-json-files-in-directory";
import path from "path";

export class TrackSeeder {
  private genreMap = new Map<string, string>();
  private labelMap = new Map<string, string>();
  private artistMap = new Map<string, string>();
  private trackMap = new Map<string, string>();
  constructor(private readonly prisma: PrismaClient) {}

  async execute(tracksDirectory) {
    const tracksPaths = findJsonFilesInDirectory(tracksDirectory);

    for (const fileName of tracksPaths) {
      const trackListPath = path.join(tracksDirectory, fileName);
      const tracksList = readJsonFile(trackListPath);
      await this.seedTrackList(tracksList);
    }
  }

  async seedTrackList(tracks) {
    for (const track of tracks) {
      await this.createGenre(track.genre);
      await this.createLabel(track.label);
      for (const artist of track.artists) {
        await this.createArtist(artist);
      }
      await this.createTrack(track);
    }
  }

  async createTrack({
    id,
    name,
    artists,
    label,
    genre,
    isOriginalMix,
    releaseDate,
    bpm,
    key,
    url,
    price,
    artWorkUrl,
  }) {
    if (!this.trackMap.has(id)) {
      const track = await this.prisma.track.create({
        data: {
          id: randomUUID() as string,
          name,
          label: { connect: { id: this.labelMap.get(label.id) } },
          genre: { connect: { id: this.genreMap.get(genre.id) } },
          isOriginalMix,
          length: 0,
          releaseDate: new Date(releaseDate).toISOString(),
          bpm: +bpm.trim().split(" ")[0] || 0,
          key,
          url,
          price,
          artWorkUrl,
        },
      });
      this.trackMap.set(id, track.id);

      for (const artist of artists) {
        await this.prisma.artistsOnTracks.create({
          data: {
            id: randomUUID() as string,
            track: { connect: { id: track.id } },
            artist: { connect: { id: this.artistMap.get(artist.id) } },
          },
        });
      }
    }
  }

  async createGenre({ id, name, url }) {
    if (!this.genreMap.has(id)) {
      const genre = await this.prisma.genre.create({
        data: { id: randomUUID() as string, name, url },
      });
      this.genreMap.set(id, genre.id);
    }
  }

  async createArtist({ id, name, url }) {
    if (!this.artistMap.has(id)) {
      const artist = await this.prisma.artist.create({
        data: { id: randomUUID() as string, name, url },
      });
      this.artistMap.set(id, artist.id);
    }
  }

  async createLabel({ id, name, url }) {
    if (!this.labelMap.has(id)) {
      const label = await this.prisma.label.create({
        data: { id: randomUUID() as string, name, url },
      });
      this.labelMap.set(id, label.id);
    }
  }
}
