-- Migration to support multiple admin users

create table if not exists admins (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text unique not null,
  password text not null, -- Store hashed passwords
  role text default 'Admin'
);

-- Security Policies
alter table admins enable row level security;
create policy "Admins are all-powerful" on admins for all using (true);
