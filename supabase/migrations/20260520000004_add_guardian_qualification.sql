-- Migration to add guardian qualification to leads table

alter table leads add column if not exists guardian_qualification text;
