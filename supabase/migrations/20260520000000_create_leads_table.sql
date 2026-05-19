create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text,
  phone text not null,
  grade text not null,
  message text,
  status text default 'New'
);

-- Enable public access for inserts
alter table leads enable row level security;
create policy "Allow anyone to insert leads" on leads for insert with check (true);
create policy "Allow admin to select leads" on leads for select using (true);
