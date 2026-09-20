-- Per-post cover images, and a distinct image for the Neon Galactic Nights follow-up.
alter table posts add column if not exists image text not null default '';
alter table posts add column if not exists image_alt text not null default '';

-- Backfill seed cover images (only where the owner has not set one).
update posts set image = '/images/hero-studio.jpg', image_alt = 'Studio workstation with code on screen', updated_at = now()
  where slug = 'rise-of-agentic-coding-ai-software-development' and image = '';
update posts set image = '/images/studio-desk.jpg', image_alt = 'Desk with website sketches, laptop, and coffee', updated_at = now()
  where slug = 'custom-web-design-vs-templates-conversion' and image = '';
update posts set image = '/images/work-smokes.jpg', image_alt = 'Warm-lit apothecary jars under an Edison bulb', updated_at = now()
  where slug = 'how-custom-discord-bots-increase-community-engagement' and image = '';
update posts set image = '/images/work-nights.jpg', image_alt = 'Moonlit city skyline from a rooftop terrace at night', updated_at = now()
  where slug = 'dark-web-aesthetic-trends-2026' and image = '';
update posts set image = '/images/work-zenith.jpg', image_alt = 'Dark industrial control panel with gauges and indicator lights', updated_at = now()
  where slug = 'build-custom-discord-bot-nodejs-2026' and image = '';
update posts set image = '/images/work-crete.jpg', image_alt = 'Sunlit polished concrete floor', updated_at = now()
  where slug = 'how-to-choose-the-right-developer' and image = '';
update posts set image = '/images/work-host.jpg', image_alt = 'Dark server room corridor lined with racks', updated_at = now()
  where slug = 'mastering-serverless-architecture' and image = '';
update posts set image = '/images/work-pulse.jpg', image_alt = 'Dark liquid-metal wave, abstract', updated_at = now()
  where slug = 'the-future-of-api-architecture' and image = '';

-- The Neon Galactic Nights follow-up gets its own neon-graded variant instead of
-- reusing the original Galactic Nights image.
update projects set image = '/images/work-neon-nights.jpg',
  image_alt = 'Rooftop terrace over a neon-lit city at night, magenta and cyan glow',
  updated_at = now()
  where slug = 'neon-galactic-nights';
