// src/fetchRandomUser.ts
import axios, { AxiosResponse } from 'axios';

interface Name {
  title: string;
  first:  string;
  last:   string;
}

interface Picture {
  large:     string;
  medium:    string;
  thumbnail: string;
}

interface RandomUserResponse {
  results: Array<{
    name:    Name;
    email:   string;
    picture: Picture;
  }>;
}

/**
 * Fetches a single random user from https://randomuser.me
 * and returns a slimmed-down object.
 */
export async function fetchRandomUser(): Promise<{
  fullName: string;
  email:    string;
  avatar:   string;
} | undefined> {
  try {
    const { data }: AxiosResponse<RandomUserResponse> = await axios.get(
      'https://randomuser.me/api/',
      { params: { inc: 'name,email,picture' } }
    );

    const user = data.results[0];
    return {
      fullName: `${user.name.title} ${user.name.first} ${user.name.last}`,
      email:    user.email,
      avatar:   user.picture.large,
    };
  } catch (err: any) {
    console.error('Failed to fetch random user:', err.message);
    return undefined;
  }
}

/* ------------------------------------------------------------------ */
/* Quick self-test (run with ts-node)                                   */
/* ------------------------------------------------------------------ */
if (require.main === module) {
  (async () => {
    const user = await fetchRandomUser();
    if (user) {
      console.log(`Fetched user: ${user.fullName} <${user.email}>`);
    }
  })();
}
