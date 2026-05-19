-- Migration to support functional Students and Attendance

-- 1. Ensure students are clearly identified (we use the leads table with 'Enrolled' status, or a dedicated table)
-- For maximum flexibility and manual addition, let's create a dedicated students table
create table if not exists students (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  grade text not null,
  type text not null, -- Home, Online, ICSE, etc.
  phone text,
  email text,
  status text default 'Active'
);

-- 2. Create Attendance table
create table if not exists attendance (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references students(id) on delete cascade not null,
  date date default current_date not null,
  is_present boolean default true,
  unique(student_id, date)
);

-- 3. Security Policies
alter table students enable row level security;
alter table attendance enable row level security;

create policy "Admin students select" on students for select using (true);
create policy "Admin students insert" on students for insert with check (true);
create policy "Admin students update" on students for update using (true);

create policy "Admin attendance select" on attendance for select using (true);
create policy "Admin attendance insert" on attendance for insert with check (true);
create policy "Admin attendance update" on attendance for update using (true);
