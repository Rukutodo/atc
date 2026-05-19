-- Migration to support global theme configuration

create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default theme
insert into site_settings (key, value)
values ('active_theme', 'light')
on conflict (key) do nothing;

-- Security Policies
alter table site_settings enable row level security;
create policy "Allow public select site_settings" on site_settings for select using (true);
create policy "Allow admin update site_settings" on site_settings for update using (true);
create policy "Allow admin insert site_settings" on site_settings for insert with check (true);
