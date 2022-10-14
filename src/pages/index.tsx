import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from 'next/link';
import enUS from 'date-fns/locale/en-US'
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { timeReadToString } from "../utils/timeReadToString";

import styles from './home.module.scss';

interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  durationAsString: string;
  duration: number;
  url: string;
  description: string;
}

interface HomeProps {
  lastTwoEpisodes: Episode[];
  oldEpisodes: Episode[];
}

export default function Home({ lastTwoEpisodes, oldEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>
          Last episodes:
        </h2>

        <ul>
          {lastTwoEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image
                  width={150}
                  height={150}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => {}}>
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>All episodes</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Members</th>
              <th>Date</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {oldEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => {}}>
                      <img src="/play-green.svg" alt="Play episode" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: enUS }),
      durationAsString: timeReadToString(Number(episode.file.duration)),
      duration: Number(episode.file.duration),
      url: episode.file.url,
      description: episode.description
    }
  });

  const lastTwoEpisodes = episodes.slice(0,2);
  const oldEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      lastTwoEpisodes,
      oldEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}