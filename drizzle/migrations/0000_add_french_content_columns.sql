ALTER TABLE public.projects
  ADD COLUMN title_fr text,
  ADD COLUMN description_fr text,
  ADD COLUMN location_fr text,
  ADD COLUMN category_fr text;

ALTER TABLE public.team_members
  ADD COLUMN position_fr text,
  ADD COLUMN description_fr text;

ALTER TABLE public.volunteer_positions
  ADD COLUMN title_fr text,
  ADD COLUMN description_fr text,
  ADD COLUMN requirements_fr text,
  ADD COLUMN location_fr text,
  ADD COLUMN time_commitment_fr text,
  ADD COLUMN category_fr text;

COMMENT ON COLUMN public.projects.title_fr IS 'French translation; falls back to title when empty';
COMMENT ON COLUMN public.projects.description_fr IS 'French translation; falls back to description when empty';
COMMENT ON COLUMN public.projects.location_fr IS 'French translation; falls back to location when empty';
COMMENT ON COLUMN public.projects.category_fr IS 'French translation; falls back to category when empty';
COMMENT ON COLUMN public.team_members.position_fr IS 'French translation; falls back to position when empty';
COMMENT ON COLUMN public.team_members.description_fr IS 'French translation; falls back to description when empty';
COMMENT ON COLUMN public.volunteer_positions.title_fr IS 'French translation; falls back to title when empty';
COMMENT ON COLUMN public.volunteer_positions.description_fr IS 'French translation; falls back to description when empty';
COMMENT ON COLUMN public.volunteer_positions.requirements_fr IS 'French translation; falls back to requirements when empty';
COMMENT ON COLUMN public.volunteer_positions.location_fr IS 'French translation; falls back to location when empty';
COMMENT ON COLUMN public.volunteer_positions.time_commitment_fr IS 'French translation; falls back to time_commitment when empty';
COMMENT ON COLUMN public.volunteer_positions.category_fr IS 'French translation; falls back to category when empty';