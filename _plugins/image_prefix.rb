# frozen_string_literal: true

# ImagePrefix plugin for lishuhang.me (v1.16, 2026-07-24)
#
# Rewrites relative image paths (/YYYY/MM/DD/slug/NN.ext) in post content
# and front matter to full URLs based on post date and site.image_prefixes.
#
# Why a Generator with priority :high?
#   - Previous versions used :pre_render hook, but it ran AFTER jekyll-seo-tag's
#     :pre_render hook, so SEO meta tags cached the un-rewritten image URL.
#   - :post_init hook was also tried but post.content may not be available.
#   - A Generator with :high priority runs BEFORE any :pre_render hooks,
#     ensuring both content AND front matter are rewritten before seo-tag
#     and Liquid rendering see them.
#
# Config format in _config.yml:
#   image_prefixes:
#     - range: [null, "2026-07"]
#       prefix: "https://lishuhang.me/img/"
#     - range: ["2026-08", null]
#       prefix: "https://lishuhang.me/img/"

module Jekyll
  class ImagePrefixGenerator < Generator
    safe true
    priority :high

    def generate(site)
      prefixes = site.config['image_prefixes'] || []
      if prefixes.empty?
        prefixes = [{ 'range' => [nil, nil], 'prefix' => site.config['url'] || '' }]
      end

      processed = 0
      rewritten = 0

      site.posts.docs.each do |post|
        processed += 1
        rewritten += rewrite_post(post, prefixes)
      end

      Jekyll.logger.info 'ImagePrefix:',
                         "Processed #{processed} posts, rewrote #{rewritten} images"
    end

    def rewrite_post(post, prefixes)
      date_str = post.date.strftime('%Y-%m')
      prefix = pick_prefix(date_str, prefixes)
      return 0 if prefix.nil? || prefix.empty?

      prefix_clean = prefix.to_s.chomp('/')
      count = 0

      # ── Rewrite front matter 'image' field ──
      # Skip if already an absolute URL (don't rewrite twice)
      if post.data['image'].is_a?(String) && post.data['image'] !~ %r{\Ahttps?://}
        if post.data['image'] =~ %r{\A/\d{4}/}
          post.data['image'] = prefix_clean + post.data['image']
          count += 1
        end
      end

      # ── Rewrite content ──
      content = post.content
      return count if content.nil? || content.empty?

      original_content = content

      # Markdown: ![alt](/YYYY/...)
      content = content.gsub(%r{(!\[[^\]]*\]\()/(\d{4}/[^\)]+)\)}) do
        md = Regexp.last_match
        count += 1
        "#{md[1]}#{prefix_clean}/#{md[2]})"
      end

      # HTML: src="/YYYY/..." or src='/YYYY/...'
      content = content.gsub(%r{(src=["'])/(\d{4}/[^"']+)["']}) do
        md = Regexp.last_match
        count += 1
        quote = md[1][-1, 1]
        "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
      end

      # HTML: data-original="/YYYY/..." (lazy-load plugins)
      content = content.gsub(%r{(data-original=["'])/(\d{4}/[^"']+)["']}) do
        md = Regexp.last_match
        count += 1
        quote = md[1][-1, 1]
        "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
      end

      post.content = content if content != original_content

      count
    end

    def pick_prefix(date_str, prefixes)
      prefixes.each do |entry|
        range = entry['range'] || [nil, nil]
        lower, upper = range[0], range[1]
        next if lower && date_str < lower
        next if upper && date_str >= upper
        return entry['prefix'].to_s
      end
      prefixes.last && prefixes.last['prefix'].to_s
    end
  end
end
