import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: any) => {
  const response = await req.json()
  const authHeader = req.headers.get('Authorization')!

  console.log("response = ", response);

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  )

  const userName = response.record.raw_user_meta_data.name;
  const userId = response.record.id;

  console.log({ userName, userId });

  const { data, error } = await supabaseClient.from('customer').insert({
    name: userName,
    user_id: userId
  });

  console.log("data = ", data)

  if (error) {
    console.log("could not update customer table");
    console.error(error);
    return new Response(
      JSON.stringify(error),
    )
  }

  return new Response(
    JSON.stringify(response),
    { headers: { "Content-Type": "application/json" } },
  )
})
