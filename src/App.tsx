import { useCallback, useEffect, useState } from "react";
import { Global, css } from "@emotion/react";
import {
  PostgrestSingleResponse,
  User,
  UserResponse,
} from "@supabase/supabase-js";
import { parse } from "marked";
import { sanitize } from "dompurify";

import { client } from "./client";
import { Banner, Button, Container, Main, NavBar } from "./styled";
import logo from "./logo.svg";

const body = css`
  body {
    margin: 0;
    background-color: #222;
    color: #fff;
    font-family: sans-serif;
  }
`;

const isDev = process.env.NODE_ENV === "development";

const SignIn = () => {
  const handler = useCallback(() => {
    client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          isDev ? "http://localhost:3000" : "https://actualwitch.github.io"
        }/ask-autometrics-dashboard/`,
      },
    });
  }, []);
  return (
    <Banner>
      <Container>
        <img src={logo} alt="logo" />
        <Button onClick={handler}>Sign in with Google</Button>
      </Container>
    </Banner>
  );
};

type QueryEntry = {
  id: number;
  created_at: string;
  query: string;
  response: string;
};

const getQueriesWithOffset = async (offset: number) => {
  const { data }: PostgrestSingleResponse<QueryEntry[]> = await client
    .from("query_history")
    .select("id, created_at, query, response")
    .order("id", { ascending: false })
    .range(offset, offset + 10);
  return data;
};

const Success = ({
  onSignOut,
  user,
}: {
  onSignOut: () => void;
  user: User;
}) => {
  const [queries, setQueries] = useState<QueryEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    (async () => {
      const { count }: PostgrestSingleResponse<UserResponse[]> = await client
        .from("query_history")
        .select("id", { count: "exact", head: true });
      if (count) {
        setTotal(count);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const data = await getQueriesWithOffset(page * 10);
      if (data) {
        setQueries(data);
      }
    })();
  }, [page]);
  const signOutHandler = useCallback(() => {
    client.auth.signOut();
    onSignOut();
  }, [onSignOut]);
  return (
    <div>
      <NavBar>
        <div>
          <img src={logo} alt="logo" />
          Page {page + 1} of {Math.ceil(total / 10)}
          <button
            disabled={page === 0}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            ←
          </button>
          <button
            disabled={page === Math.ceil(total / 10) - 1}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            →
          </button>
        </div>
        <div>
          Signed in as {user.email}
          <Button onClick={signOutHandler}>Sign out</Button>
        </div>
      </NavBar>
      <Main>
        {queries.map((query) => (
          <article key={query.id}>
            <header>
              {">"} {query.query}
            </header>
            <section>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(parse(query.response)),
                }}
              />
            </section>
          </article>
        ))}
      </Main>
    </div>
  );
};

function App() {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await client.auth.getUser();
      setUser(user);
    })();
  }, []);
  const onSignOut = useCallback(() => {
    setUser(null);
  }, [setUser]);
  return (
    <div className="App">
      {user ? <Success user={user} onSignOut={onSignOut} /> : <SignIn />}
      <Global styles={body} />
    </div>
  );
}

export default App;
