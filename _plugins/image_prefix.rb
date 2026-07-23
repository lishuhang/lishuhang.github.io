# frozen_string_literal: true

# ImagePrefix plugin for lishuhang.me (v1.16, 2026-07-24)
#
# Rewrites relative image paths (/YYYY/MM/DD/slug/NN.ext) to full URLs
# based on post date and site.image_prefixes.
#
# Strategy: use :post_render hook to modify the FINAL HTML output.
# This fires after kramdown converts markdown to HTML AND after the
# layout is applied, so we can rewrite ALL image URLs in the final HTML:
#   - Content images: <img src="/YYYY/..."> (from markdown ![](...))
#   - Cover image: <img data-original="https://lishuhang.me/YYYY/...">
#     (from layout's absolute_url filter on page.image)
#   - weserv.nl proxy URLs containing lishuhang.me/YYYY/...
#
# Config format in _config.yml:
#   image_prefixes:
#     - range: [null, "2026-07"]
#       prefix: "https://lishuhang.me/img/"
#     - range: ["2026-08", null]
#       prefix: "https://lishuhang.me/img/"

module Jekyll
  module ImagePrefix
    @rewrite_count = 0

    class << self
      attr_accessor :rewrite_count
    end

    def self.config(site)
      @prefixes_cache ||= {}
      @prefixes_cache[site.object_id] ||= begin
        prefixes = site.config['image_prefixes'] || []
        if prefixes.empty?
          prefixes = [{ 'range' => [nil, nil], 'prefix' => site.config['url'] || '' }]
        end
        prefixes
      end
    end

    def self.pick_prefix(site, date_str)
      config(site).each do |entry|
        range = entry['range'] || [nil, nil]
        lower, upper = range[0], range[1]
        next if lower && date_str < lower
        next if upper && date_str >= upper
        return entry['prefix'].to_s
      end
      config(site).last && config(site).last['prefix'].to_s
    end

    # Rewrite image URLs in rendered HTML output (called from :post_render hook)
    def self.rewrite_html_output(post, site)
      output = post.output
      return if output.nil? || output.empty?

      date_str = post.date.strftime('%Y-%m')
      prefix = pick_prefix(site, date_str)
      return if prefix.nil? || prefix.empty?

      prefix_clean = prefix.chomp('/')
      # Extract the host from prefix (e.g., "https://lishuhang.me" from
      # "https://lishuhang.me/img/")
      host = prefix_clean.sub(%r{/img$}, '')
      encoded_host = host.gsub('/', '%2F').gsub(':', '%3A')

      match_count = 0

      # ── 1. Rewrite relative paths: attr="/YYYY/..." ──
      # These come from markdown ![](...) converted by kramdown
      %w[src data-original srcset data-src data-lazy].each do |attr|
        pattern = %r{(#{attr}=["'])/(\d{4}/[^"']+)["']}
        output = output.gsub(pattern) do |m|
          md = Regexp.last_match
          match_count += 1
          quote = md[1][-1, 1]
          "#{md[1]}#{prefix_clean}/#{md[2]}#{quote}"
        end
      end

      # ── 2. Rewrite absolute URLs: host/YYYY/... → host/img/YYYY/... ──
      # These come from layout's absolute_url filter on page.image
      # Use negative lookahead (?!img/) to skip URLs that already have /img/
      pattern2 = %r{(#{Regexp.escape(host)})/(?!(?:img/|assets/|posts/|page/))(\d{4}/\d{2}/[^"'\s<>]+)}
      output = output.gsub(pattern2) do |m|
        md = Regexp.last_match
        match_count += 1
        "#{md[1]}/img/#{md[2]}"
      end

      # ── 3. Rewrite URL-encoded absolute URLs in weserv.nl proxy ──
      # weserv proxy: url=https%3A%2F%2Flishuhang.me%2F2026%2F...
      encoded_pattern = %r{(#{Regexp.escape(encoded_host)})%2F(?!(?:img%2F))(\d{4}%2F\d{2}%2F[^&"'\s<>]+)}
      output = output.gsub(encoded_pattern) do |m|
        md = Regexp.last_match
        match_count += 1
        "#{md[1]}%2Fimg%2F#{md[2]}"
      end

      if match_count > 0
        post.output = output
        @rewrite_count += match_count
      end
    end
  end
end

# :post_render hook — rewrite image URLs in the final rendered HTML.
Jekyll::Hooks.register :posts, :post_render do |post|
  Jekyll::ImagePrefix.rewrite_html_output(post, post.site)
end

Jekyll::Hooks.register :site, :after_init do |site|
  prefixes = Jekyll::ImagePrefix.config(site)
  Jekyll.logger.info 'ImagePrefix:',
                     "Loaded with #{prefixes.size} prefix ranges (v1.16 post_render strategy)"
end

Jekyll::Hooks.register :site, :post_write do |site|
  Jekyll.logger.info 'ImagePrefix:',
                     "Total URLs rewritten: #{Jekyll::ImagePrefix.rewrite_count}"
end
