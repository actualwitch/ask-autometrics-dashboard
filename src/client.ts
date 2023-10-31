import { createClient } from "@supabase/supabase-js";

const ensureEnv = (name: string) => {
  const actualName = `REACT_APP_${name}`;
  if (!process.env[actualName]) {
    throw new Error(`Missing env var: ${name}`);
  }
  return process.env[actualName];
};

const supabaseUrl = ensureEnv("SUPABASE_URL");
const supabaseKey = ensureEnv("SUPABASE_KEY");

export const client = createClient(supabaseUrl!, supabaseKey!, {
  db: { schema: "queries" },
});
