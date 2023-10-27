import { useCallback, useEffect } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { client } from "./client";

const SignIn = () => {
  const handler = useCallback(() => {
    client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          "https://actualwitch.github.io/ask-autometrics-dashboard/success",
      },
    });
  }, []);
  return (
    <div>
      <button onClick={handler}>Sign in with Google</button>
    </div>
  );
};

const Success = () => {
  useEffect(() => {
    (async () => {
      const user = await client.auth.getUser();
      const session = await client.auth.getSession();
      console.log({ user, session });

      client
        .from("docs.page")
        .select()
        .then((res) => {
          console.log(res);
        });
    })();
  }, []);
  return <div>Success</div>;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      loader: () => redirect("/signin"),
    },
    {
      path: "/signin",
      Component: SignIn,
    },
    {
      path: "/success",
      Component: Success,
    },
  ],
  { basename: "/ask-autometrics-dashboard" }
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
